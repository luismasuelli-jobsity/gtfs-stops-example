// requires https://maps.googleapis.com/maps/api/js?key=AN_API_KEY&callback=initGoogleMapsAPI&libraries=places
(function($){
    window.initGoogleMapsAPI = function() {
        function GMapsPositionWidget(domElement, domSearchElement, latitude, longitude, label, zoom, editCallback) {
            var position = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
            var map = new google.maps.Map(domElement, {center: position, zoom: zoom});
            var marker = new google.maps.Marker({position: position, map: map, title: label, draggable: true});
            var gmaps_pw = this;
            var searchWrapper = $(domSearchElement);

            gmaps_pw.setPosition = function(position) {
                marker.setPosition(position);
                map.panTo(position);
                if (editCallback) {
                    editCallback(marker.getPosition());
                }
            };
            gmaps_pw.getPosition = function() {
                var position = marker.getPosition();
                return {lat: position.lat(), lng: position.lng()};
            };

            if (domSearchElement) {
                map.controls[google.maps.ControlPosition.TOP_RIGHT].push(domSearchElement);
                var autocomplete = new google.maps.places.Autocomplete(domSearchElement);
                autocomplete.bindTo('bounds', map);
                autocomplete.setTypes([]);
                autocomplete.addListener('place_changed', function() {
                    var place = autocomplete.getPlace();
                    if (place.geometry && place.geometry.location) {
                        gmaps_pw.setPosition(place.geometry.location);
                        searchWrapper.val('');
                    }
                });
            }

            if (editCallback) {
                map.addListener('click', function(e) {
                    gmaps_pw.setPosition(e.latLng);
                });
                marker.addListener('dragend', function(e) {
                    gmaps_pw.setPosition(e.latLng);
                });
            }
        }
        var initMaps = function() {
            $('.google-map:not(.gmap-started)').each(function() {
                var domElement = this;
                var wrapper = $(this);
                var domSearchWrapper = wrapper.next('input[type=text].gmap-autocomplete');
                domSearchWrapper.css({marginRight: 8, marginTop: 8});
                var domSearchElement = domSearchWrapper.get(0);
                var editCallback = null;
                var latField = wrapper.data('gmap-latfield');
                var lngField = wrapper.data('gmap-lngfield');
                var latFieldWrapper;
                var lngFieldWrapper;
                if (latField || lngField) {
                    latFieldWrapper = latField ? $(latField) : $();
                    lngFieldWrapper = lngField ? $(lngField) : $();
                    editCallback = function(position) {
                        latFieldWrapper.val(position.lat().toFixed(6));
                        lngFieldWrapper.val(position.lng().toFixed(6));
                    };
                    latFieldWrapper.blur(function() {
                        var position = wrapper.data('gmap-widget').getPosition();
                        wrapper.data('gmap-widget').setPosition({lat: parseFloat($(this).val()), lng: position.lng});
                    });
                    lngFieldWrapper.blur(function() {
                        var position = wrapper.data('gmap-widget').getPosition();
                        wrapper.data('gmap-widget').setPosition({lat: position.lat, lng: parseFloat($(this).val())});
                    });
                }
                var first = function() {
                    for(var idx=0; idx < arguments.length; idx++) {
                        if (arguments[idx] !== undefined) return arguments[idx];
                    }
                };
                wrapper.data('gmap-widget', new GMapsPositionWidget(
                    domElement, domSearchElement,
                    first(wrapper.data('gmap-lat'), latFieldWrapper && latFieldWrapper.val(), 0),
                    first(wrapper.data('gmap-lng'), lngFieldWrapper && lngFieldWrapper.val(), 0),
                    wrapper.data('gmap-label') || 'You are Here',
                    first(wrapper.data('gmap-zoom'), 3), editCallback
                )).addClass('gmap-started');
            });
        };
        $(function() {
            $(document).on('ajaxComplete', function(){ setTimeout(initMaps, 1000); });
            initMaps();
        });
    }
})(jQuery);