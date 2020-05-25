// requires jquery-ui-timepicker-addon.min.js
(function($) {
    function initDatepickers() {
        $('.datepicker:not(.hasDatepicker)').each(function() {
            $(this).prop('readonly', true).datepicker({
                dateFormat: $(this).data('date-format') || 'yy-mm-dd',
                changeMonth: true,
                changeYear: true,
                beforeShow: function () {
                    $('.ui-datepicker').css('z-index', 9999);
                }
            });
        });
        $('.datetimepicker:not(.hasDatepicker)').each(function() {
            $(this).prop('readonly', true).datetimepicker({
                dateFormat: $(this).data('date-format') || 'yy-mm-dd',
                controlType: 'select',
                changeMonth: true,
                changeYear: true,
                oneLine: true,
                timeFormat: 'HH:mm:ss',
                beforeShow: function () {
                    $('.ui-datepicker').css('z-index', 9999);
                }
            });
        });
        $('.timepicker:not(.hasDatepicker)').each(function() {
            $(this).prop('readonly', true).timepicker({
                timeFormat: 'HH:mm:ss',
                beforeShow: function () {
                    $('.ui-datepicker').css('z-index', 9999);
                }
            });
        });
    }
    $(function() {
        $(document).on('ajaxComplete', function() {
            initDatepickers();
        });
        initDatepickers();
    });
})(jQuery);
