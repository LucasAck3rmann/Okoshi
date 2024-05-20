$(function () {

    // open popup
    $(".budget-button").click(function (e) {

        //pop-up de orçamento

        if ($(this).attr("data-produto") == null || $(this).attr("data-produto") == "" || $(this).attr("data-produto") == undefined || $(this).attr("data-produto") == "undefined") {
            $(".produto").val('');
            $(".referencia").val('');
            $(".produtoContent").hide();
        }
        else {
            $(".produto").val($(this).attr("data-produto"));
            $(".referencia").val($(this).attr("data-referencia"));
            $(".produtoContent").show();
        }

        e.preventDefault();
        $(".act-popup-overlay").removeClass("closed");
    });
    
    // close popup
    $(".act-popup-overlay .close-btn").click(function () {
        $(".act-popup-overlay").addClass("closed");
    });

});
