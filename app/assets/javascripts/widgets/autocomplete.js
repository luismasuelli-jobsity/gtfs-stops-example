// requires jquery-ui-autocomplete-html-addon.js
/*
(function($){
    function initAutocompletes(){
        $('.autocomplete:not(.ui-autocomplete-input)').each(function(){
            var obj = $(this);
            var source = obj.data('autocomplete-source');
            var minLength = obj.data('autocomplete-minlength');
            var html = !!obj.data('autocomplete-html');

            // Do we have an autocomplete related ID field?
            var idFieldName = obj.data('autocomplete-idfield-ref');
            if (idFieldName) {
                var idFieldType = (obj.data('autocomplete-idfield-reftype') || '').toString().toLocaleLowerCase();
                var idFieldGetter = null;
                switch (idFieldType) {
                    case 'inform-name':
                        idFieldGetter = function() { return obj.closest('form').find('[name="'+idFieldName+'"]'); };
                        break;
                    case 'dom-id':
                        idFieldGetter = function() { return $(idFieldName); };
                        break;
                    case 'inform-selector':
                        idFieldGetter = function() { return obj.closest('form').find(idFieldName); };
                        break;
                    default:
                        idFieldGetter = function() { return obj.closest('form').find(idFieldName); };
                        console.log('WARNING: autocomplete-idfield-type data element had an invalid value. ' +
                                    'It was coerced to: inform-selector');
                }


            }

            var select = null;
            try {
                select = eval(obj.data('autocomplete-onselect'));
            } catch(e) {
                console.log('WARNING: autocomplete-onselect raised an exception when trying to evaluate it!!');
                console.error(e, e.stack);
            }
            // an autocomplete widget should not have name on its own, but a reference to
            // a field (perhaps a searchable selector)
        });
    }
    $(document).on('ajaxComplete', function() {
        initAutocompletes();
    });
    initAutocompletes();
})(jQuery);
*/