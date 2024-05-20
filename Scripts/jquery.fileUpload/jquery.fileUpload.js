/*
 Created and Developed by Felipe Prado
 www.felipeprado.com.br
 */

$(window).bind("load", function() {
    if ($("input[type='file']").length >= 1) {
        $("input[type='file']").each(function () {
            $(this).wrap("<div class='file' />");
            if ($("body").hasClass("pt-BR")) {
                $(this).parent().append("<div class='file_button transition'>Selecionar arquivo</div><div class='file_name' />");
            }
            else if ($("body").hasClass("en-US")) {
                $(this).parent().append("<div class='file_button transition'>Select File</div><div class='file_name' />");
            }
            else if ($("body").hasClass("es-ES")) {
                $(this).parent().append("<div class='file_button transition'>Seleccionar archivo</div><div class='file_name' />");
            }
            else {
                $(this).parent().append("<div class='file_button transition'>Selecionar arquivo</div><div class='file_name' />");
            }
            var buttonWidth = $(this).parent().find(".file_button").outerWidth(true);
            var buttonHeight = $(this).parent().find(".file_button").outerHeight(true);

            $(this).height(buttonHeight).width(buttonWidth);
            $(this).parent().height(buttonHeight);
            $(this).parents(".file").find(".file_name").css("left", buttonWidth);

            $(this).change(function () {
                var fileName = $(this).val().split('\\');
                var fileName = fileName[fileName.length - 1];

                $(this).parents(".file").find(".file_name").text(fileName).removeClass("error");
            });

            $(this).hover(function () {
                $(this).parents(".file").find(".file_button").toggleClass("hover");
            });
        });

        $(".vg-trabalhe-conosco .btnEnviar").click(function (e) {
            if (!ValidateGroup(".vg-trabalhe-conosco .btnEnviar")) {
                e.preventDefault();

                $(".vg-trabalhe-conosco input[type='file']").each(function () {
                    if ($(this).hasClass("error")) {
                        $(this).parents(".file").find(".file_name").text("*Você deve anexar um arquivo").addClass("error");
                    }
                });
            }
        });
    }
});