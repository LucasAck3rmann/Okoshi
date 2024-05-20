//HTML PARAMETERS

//*data-actbox = true or false
//*data-actbox-type = confirm or alert
//*data-actbox-title = Your Title
//*data-actbox-content = Your Text
//data-actbox-confirm-button = Your confirm button Text (default text is "Confirmar" when data- actbox - type is "confirm" and "Fechar" when data- actbox - type is "alert")
//data-actbox-confirm-action = Define a link or some js function when user clicks on confirm button (default is close the dialog box)
//data-actbox-confirm-target = Define the link target from your confirm button (eg: _blank)
//data-actbox-cancel-button = Your cancel button text (default text is "Cancelar")

//All the parameter that has * are required.

$(function () {
    if ($("[data-actbox='true']")) {

        $("[data-actbox='true']").each(function () {

            $(this).click(function (e) {
                e.preventDefault();

                actboxType = $(this).attr("data-actbox-type");
                actboxTitle = $(this).attr("data-actbox-title");
                actboxContent = $(this).attr("data-actbox-content");
                actboxConfirm = $(this).attr("data-actbox-confirm-button");
                actboxConfirmAction = $(this).attr("data-actbox-confirm-action");
                actboxConfirmTarget = $(this).attr("data-actbox-confirm-target");

                // CONFIRM
                if (actboxType == "confirm") {
                    actboxCancel = $(this).attr("data-actbox-cancel-button");

                    // cancel button
                    if (actboxCancel == undefined) {
                        actboxCancel = "Cancelar";
                    }
                    
                    // confirm button
                    if (actboxConfirm == undefined) {
                        actboxConfirm = "Continuar"
                    }
                }


                // ALERT
                else if (actboxType == "alert") {
                    if (actboxConfirm == undefined) {
                        actboxConfirm = "Fechar";
                    }

                    actboxCancel = undefined;
                }

                actbox(actboxType, actboxTitle, actboxContent, actboxConfirm, actboxConfirmAction, actboxConfirmTarget, actboxCancel);
            });
        });
    }
});

function actbox(actboxType, actboxTitle, actboxContent, actboxConfirm, actboxConfirmAction, actboxConfirmTarget, actboxCancel) {
    $(".actbox").remove();

    $("body").append("<div class='actbox'>" +
        "<div class='box' >" +
        "<h2 class='title'/>" +
        "<p />" +
        "<div class='buttons-grid'/>" +
        "</div>" +
        "</div>");

    // confirm box
    if (actboxType == "confirm") {
        //cancel button
        $(".actbox .box .buttons-grid").prepend("<a href='#' class='button cancel'>" + actboxCancel + "</a>");
    }

    // confirm button
    $(".actbox .box .buttons-grid").append("<a href='#' class='button'>" + actboxConfirm + "</a>");

    if (actboxConfirmAction != undefined) {
        $(".actbox .box .buttons-grid .button:last").attr("href", actboxConfirmAction);
    }
    else {
        $(".actbox .box .buttons-grid .button:last").attr("href", "#");
    }

    if (actboxConfirmTarget != undefined) {
        $(".actbox .box .buttons-grid .button:last").attr("target", actboxConfirmTarget);
    }
    else {
        $(".actbox .box .buttons-grid .button:last").attr("target", "");
    }

    //change content from box
    $(".actbox .box .title").html(actboxTitle);
    $(".actbox .box p").html(actboxContent);

    setTimeout(function () {
        $(".actbox").addClass("active");
    }, 50);

    //close function
    $(".actbox .box .buttons-grid .button").click(function (e) {
        if ($(this).attr("href") == "#") {
            e.preventDefault();
        }

        $(".actbox").removeClass("active");
    });
}

function actboxAlert(title, content) {
    actbox('alert', title, content, 'Fechar', '#', '', '')
}

function actboxAlertRedirect(title, content, buttonLegend, urlRedirect) {
    actbox('alert', title, content, buttonLegend, urlRedirect, '', '');
}

function actboxAlertRedirectClose(title, content, buttonLegend, urlRedirect) {
    actbox('confirm', title, content, buttonLegend, urlRedirect, '', 'Fechar');
}