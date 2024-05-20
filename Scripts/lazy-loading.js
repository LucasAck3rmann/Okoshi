$(window).scroll(function () {
    lazyLoading();
});

function lazyLoading() {
    $("[data-src]").each(function () {
        var source = $(this).attr("data-src");
        $(this).attr("src", source);
        $(this).removeAttr("data-src");

        if (!(navigator.userAgent).match(/Mobile/i)) {
            if ($(this).parents("video").length > 0) {
                $(this).parents("video").load();
            }
        }
    });

    if (!(navigator.userAgent).match(/Mobile/i)) {
        $("[data-map]").each(function () {
            var source = $(this).attr("data-map");
            $(this).append("<iframe src='" + source + "' frameborder='0'></iframe>");

            $(this).removeAttr("data-map");
        });
    }

    $("body").removeClass("lazy-loading");
}