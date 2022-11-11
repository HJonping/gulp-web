import jQuery from 'jquery'

(function ($) {

    $.fn.toTop = function (opt) {

        //variables
        var elem = this;
        var win = $(window);
        var doc = $('html, body');

        //Extended Options
        var options = $.extend({
            autohide: true,
            offset: 420,
            speed: 500,
            position: true,
            right: 15,
            bottom: 30
        }, opt);

        elem.css({
            'cursor': 'pointer'
        });

        if (options.autohide) {
            elem.css('display', 'none');
        }

        if (options.position) {
            elem.css({
                'position': 'fixed',
                'right': options.right,
                'bottom': options.bottom,
            });
        }

        elem.on('click', function () {
            doc.animate({ scrollTop: 0 }, options.speed);
        });

        win.on('scroll', function () {
            var scrolling = win.scrollTop();

            if (options.autohide) {
                if (scrolling > options.offset) {
                    elem.fadeIn(options.speed);
                }
                else elem.fadeOut(options.speed);
            }

        });

    };

}(jQuery));
