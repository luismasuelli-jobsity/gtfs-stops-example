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
                    editCallback(position);
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
                if (latField || lngField) {
                    var latFieldWrapper = latField ? $(latField) : $();
                    var lngFieldWrapper = lngField ? $(lngField) : $();
                    editCallback = function(position) {
                        latFieldWrapper.val(position.lat);
                        lngFieldWrapper.val(position.lng);
                    };
                }
                wrapper.data('gmap-widget', new GMapsPositionWidget(
                    domElement, domSearchElement, wrapper.data('gmap-lat') || 0, wrapper.data('gmap-lng') || 0,
                    wrapper.data('gmap-label') || 'You are Here', wrapper.data('gmap-zoom') || 3, editCallback
                )).addClass('gmap-started');
            });
        };
        $(function() {
            $(document).on('ajaxComplete', function(){ setTimeout(initMaps, 1000); });
            initMaps();
        });
    }
})(jQuery);