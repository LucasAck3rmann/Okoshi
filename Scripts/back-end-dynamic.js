$(function () {
    var url_atual = window.location.href;
    if (url_atual.toLocaleLowerCase().indexOf('/offline') <= -1) {

        //verifica status de bloqueio
        $.getJSON('/webservice/statussite', function (data) {
            if (data == true) {
                window.location.href = "/offline";
            }
        });

        //status da página - deletada - publicada
        $.getJSON('/webservice/statuspagina', { "pagina": url_atual }, function (data) {
            if (data == false) {
                window.location.href = "/404";
            }
        });
    }
});