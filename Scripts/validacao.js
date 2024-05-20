
// Validação dos campos
$(function () {
    $('.btnEnviar').click(ValidateAndSubmit);
})
function ValidateAndSubmit(evt) {
    var obj = this;
    var isValid = ValidateGroup(evt.currentTarget);
    
    if (!isValid) {
        evt.preventDefault();
        //$('.loading').fadeOut(300);
    }
    else {
        if ($(obj).is("[class*='btloading']")) {
            //$('.loading').fadeIn(300);
        }

        if ($(obj).is("[class*='forcepostback']")) {
            var onclick = $(obj).is("[class*='forcepostback']");
            var name = $(obj).attr("name");
            var id = $(obj).attr("id").replace(/_/i, '');
            __doPostBack(name != "" ? name : id, '');
        }
    }
}

function ValidateGroup(currentTarget, rules, messages) {
    var target = currentTarget.currentTarget || currentTarget;

    var form = null;

    if ($(target).length > 0 && $(target)[0].tagName.toLowerCase() == "form") {
        form = $(target);
    }
    else {
        form = $(target).parents('form');
    }

    if (form.length == 0) {
        form = $("form");
    }

    $(form).validate({

        onsubmit: false,
        submitHandler: function () { PreventPostback = false; },
        rules: rules,
        messages: messages
    });

    if ($(".required input:radio").length > 0) {
        $(".required input:radio").each(function () {
            $(this).rules("add", { required: true });
        });
    }

    var $group = $(target).parents('.validationGroup');

    if ($group.length == 0) {
        $group = $("form");
    }

    var isValid = true;
    var firstInvalidItem = null;

    $group.find(':input:not(:disabled)').each(function (i, item) {
        if (!$(item).valid() && !$(item).hasClass("valid")) {
            isValid = false;
            if (!firstInvalidItem) {
                firstInvalidItem = $(item);
            }
        }
    });
    if (firstInvalidItem) {
        firstInvalidItem.focus();
    }
    return isValid;
}
// Fim Validação dos campos
