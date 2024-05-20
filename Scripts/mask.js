$(function () {
    // Coloca mascara nos campos de telefone
    $('.tel').focusout(function () {
        var phone, element;
        element = $(this);
        element.unmask();
        phone = element.val().replace(/\D/g, '');
        element.mask("(99) 9999-9999");
    }).trigger('focusout');

    $('.cel').focusout(function () {
        var phone, element;
        element = $(this);
        element.unmask();
        phone = element.val().replace(/\D/g, '');
        element.mask("(99) 99999-9999");
    }).trigger('focusout');

    $('.telCel').focusout(function () {
        var phone, element;
        element = $(this);
        element.unmask();
        phone = element.val().replace(/\D/g, '');
        if (phone.length > 10) {
            element.mask("(99) 99999-999?9");
        } else {
            element.mask("(99) 9999-9999?9");
        }
    }).trigger('focusout');

    $('.cep').focusout(function () {
        var phone, element;
        element = $(this);
        element.unmask();
        phone = element.val().replace(/\D/g, '');
        element.mask("99999-999");
    }).trigger('focusout');

    $('.cpf').focusout(function () {
        var phone, element;
        element = $(this);
        element.unmask();
        phone = element.val().replace(/\D/g, '');
        element.mask("999.999.999.99");
    }).trigger('focusout');

    $('.cnpj').focusout(function () {
        var phone, element;
        element = $(this);
        element.unmask();
        phone = element.val().replace(/\D/g, '');
        element.mask("99.999.999/9999-99");
    }).trigger('focusout');

    // Calendario
    if ($('.dateBR').length > 0) {
        $('.dateBR').datepicker({
            format: "dd/mm/yyyy",
            todayBtn: "linked",
            language: "pt-BR",
            autoclose: true,
            todayHighlight: true
        });
        $('.dateBR').attr("data-inputmask", "'alias': 'dd/mm/yyyy'").attr('data-mask', '');
    }
});