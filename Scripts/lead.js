$(function () {
    function generateUUIDs() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    if ($.cookie('OkoshiGuid') == "" || $.cookie('OkoshiGuid') == null) {
        $.cookie('OkoshiGuid', generateUUIDs(), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
        $.cookie('OkoshiGuid', generateUUIDs(), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
        $.cookie('OkoshiGuid', generateUUIDs(), { expires: 1000, path: '/', domain: 'localhost' });
    }

    $(".lead-overlay .lead-popup .skip,.lead-overlay-2 .lead-popup .skip").click(function (e) {
        e.preventDefault();
        $(this).parents(".lead-overlay").find(".close-button").click();
        $(this).parents(".lead-overlay-2").find(".close-button").click();
        var score = $(this).parents(".lead-popup").attr("data-score");
        var titulo = $(this).parents(".lead-popup").attr("data-titulo");
        var id = $(this).parents(".lead-popup").attr("data-id");
        var route = $(this).parents(".lead-popup").attr("data-route");
        var link = $(this).parents(".lead-popup").attr("data-link");

        if (route == 'artigo' || route == 'ebook') {
            window.open(link);
        }
        else if (route == 'video') {
            if (!(navigator.userAgent).match(/Mobile/i)) {
                video(link.split('=')[1], titulo);
            }
            else {
                window.open(link);
            }
        }
        else {
            if (link != '' && link != undefined && link != '#') {
                window.open(link);
            }
        }

        AcaoRegistro(score, titulo, id, $.cookie('email'), $.cookie('nome'), 'true');

        $.cookie('qualpopup', '3', { expires: 1000, path: '/', domain: '.okoshi.com.br' });
        $.cookie('qualpopup', '3', { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
        $.cookie('qualpopup', '3', { expires: 1000, path: '/', domain: 'localhost' });
    });

    //close dialog box
    $(".lead-overlay .lead-popup .close-button, .lead-overlay-2 .lead-popup .close-button").click(function () {
        $(this).parents(".lead-overlay").removeClass("active");
        $(this).parents(".lead-overlay-2").removeClass("active");
    });

    function gravaMenu(btn) {
        var usuario = [];
        var score = $(btn).attr("data-score");
        usuario.push('Guid,' + $.cookie('OkoshiGuid'));
        if ($.cookie('email') != null)
            usuario.push('Email,' + $.cookie('email'));
        if ($.cookie('nome') != null)
            usuario.push('Nome,' + $.cookie('nome'));
        usuario.push('Acao,' + $(btn).attr("data-titulo"));
        usuario.push('Origem,' + score);
        usuario.push('AcaoID,0');

        $.cookie('usuario', JSON.stringify(usuario), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
        $.cookie('usuario', JSON.stringify(usuario), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
        $.cookie('usuario', JSON.stringify(usuario), { expires: 1000, path: '/', domain: 'localhost' });

        $.getJSON('/Home/GravaAcao', { "valor": JSON.stringify(usuario), "tipoID": score, 'pulou': 'false' }, function (data) { });
    };

    // ativa os links ativos / contagem de score
    $("header .content nav ul li a").each(function () {
        $(this).click(function (e) {
            gravaMenu(this);
        });
    });

    function AcaoRegistro(score, acao, dataID, email, nome, pulou, e) {

        var usuario = [];
        usuario.push('Guid,' + $.cookie('OkoshiGuid'));
        if (email != null)
            usuario.push('Email,' + email);
        if (nome != null)
            usuario.push('Nome,' + nome);
        usuario.push('Acao,' + acao);
        usuario.push('Origem,' + score);
        usuario.push('AcaoID,' + (dataID != "" && dataID != null ? dataID : 0));

        $.cookie('usuario', JSON.stringify(usuario), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
        $.cookie('usuario', JSON.stringify(usuario), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
        $.cookie('usuario', JSON.stringify(usuario), { expires: 1000, path: '/', domain: 'localhost' });

        $.getJSON('/Home/GravaAcao', { "valor": JSON.stringify(usuario), "tipoID": score, 'pulou': pulou }, function (data) { });
    }

    function gravarPopup(nome, email, telefone, empresa, link, score, route, titulo, id, pulou) {
        $('.loading').fadeIn();

        if (email == "")
            email = $.cookie('emailform');
        else {
            $.cookie('email', email, { expires: 1000, path: '/', domain: '.okoshi.com.br' });
            $.cookie('email', email, { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
            $.cookie('email', email, { expires: 1000, path: '/', domain: 'localhost' });

            $.cookie('nome', nome, { expires: 1000, path: '/', domain: '.okoshi.com.br' });
            $.cookie('nome', nome, { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
            $.cookie('nome', nome, { expires: 1000, path: '/', domain: 'localhost' });
        }
        var idRetorno = '';
        if ($.cookie("idRetorno") != null)
            idRetorno = $.cookie('idRetorno');

        if (route == 'artigo' || route == 'ebook') {
            window.open(link);
        }
        else if (route == 'video') {
            if (!(navigator.userAgent).match(/Mobile/i)) {
                video(link.split('=')[1], titulo);
            }
            else {
                window.open(link);
            }
        }
        else {
            if (link != '' && link != undefined && link != '#') {
                window.open(link);
            }
        }

        $.getJSON('/Home/GravaPopup', { "nome": nome, "email": email, "telefone": telefone, "empresa": empresa, "guid": $.cookie('OkoshiGuid'), 'idRetorno': idRetorno, 'tipoID': id }, function (data) {
            if (data.split('=')[0] == 'deu') {
                $('.loading').fadeOut();
                $(".lead-overlay .lead-popup .close-button, .lead-overlay-2 .lead-popup .close-button").click();
                if (data.split('=')[1] != '0') {
                    $.cookie('idRetorno', data.split('=')[1], { expires: 1000, path: '/', domain: '.okoshi.com.br' });
                    $.cookie('idRetorno', data.split('=')[1], { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
                    $.cookie('idRetorno', data.split('=')[1], { expires: 1000, path: '/', domain: 'localhost' });
                }
                else {
                    $.removeCookie("idRetorno");
                }

                if (route == 'ebook' || route == 'artigo' || route == 'video') {
                    if ($.cookie('qualpopup') != '3') {
                        if ($.cookie('qualpopup') == '2') {
                            $.cookie('qualpopup', "3", { expires: 1000, path: '/', domain: '.okoshi.com.br' });
                            $.cookie('qualpopup', "3", { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
                            $.cookie('qualpopup', "3", { expires: 1000, path: '/', domain: 'localhost' });
                        }
                        else if ($.cookie('qualpopup') == '1') {
                            $.cookie('qualpopup', "2", { expires: 1000, path: '/', domain: '.okoshi.com.br' });
                            $.cookie('qualpopup', "2", { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
                            $.cookie('qualpopup', "2", { expires: 1000, path: '/', domain: 'localhost' });
                        }
                    }
                }

                setTimeout(function () {
                    AcaoRegistro(score, titulo, id, $.cookie('email'), $.cookie('nome'), pulou);
                }, 500);
            }
            else
                console.log('erro => ' + data);
        });
    }

    $('.btPopup1').click(function (e) {
        e.preventDefault();
        var nome = $('.formPopup .nome').val();
        var email = $('.formPopup .email').val();
        var link = $(this).parents('.lead-popup').attr('data-link');
        var score = $(this).parents('.lead-popup').attr("data-score");
        var route = $(this).parents('.lead-popup').attr("data-route");
        var titulo = $(this).parents('.lead-popup').attr("data-titulo");
        var id = $(this).parents('.lead-popup').attr("data-id");

        if (nome != '' && email != '') {

            $.cookie('emailform', email, { expires: 1000, path: '/', domain: '.okoshi.com.br' });
            $.cookie('emailform', email, { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
            $.cookie('emailform', email, { expires: 1000, path: '/', domain: 'localhost' });

            gravarPopup(nome, email, '', '', link, score, route, titulo, id, 'false', e);
        }
    });

    $('.btPopup2').click(function (e) {
        e.preventDefault();
        var empresa = $('.formPopup1 .empresa').val();
        var tel = $('.formPopup1 .telCel').val();
        var link = $(this).parents('.lead-popup').attr('data-link');
        var score = $(this).parents('.lead-popup').attr("data-score");
        var route = $(this).parents('.lead-popup').attr("data-route");
        var titulo = $(this).parents('.lead-popup').attr("data-titulo");
        var id = $(this).parents('.lead-popup').attr("data-id");
        if (empresa != '' && tel != '') {
            nome = "";
            email = "";
            if ($.cookie('email') != null)
                email = $.cookie('email');
            if ($.cookie('nome') != null)
                nome = $.cookie('nome');
            gravarPopup(nome, email, tel, empresa, link, score, route, titulo, id, 'false', e);
        }
    });
});

function clickScore(value) {

    var score = $(value).attr("data-score");
    var route = $(value).attr("data-route");

    if ($.cookie('qualpopup') == null) {
        $.cookie('qualpopup', "1", { expires: 1000, path: '/', domain: '.okoshi.com.br' });
        $.cookie('qualpopup', "1", { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
        $.cookie('qualpopup', "1", { expires: 1000, path: '/', domain: 'localhost' });
    }

    if (route != undefined) {

        var link = "";
        if ($(value).attr("data-link") != null) {
            link = $(value).attr("data-link");
        }
        else if ($(value).attr("href") != null) {
            link = $(value).attr("href");
        }

        var titulo = $(value).attr("data-titulo");
        var id = $(value).attr("data-id");

        if ($.cookie('qualpopup') == '1') {
            $(".lead-overlay").addClass("active");
            setTimeout(function () {
                $(".lead-popup").attr("data-link", link);
                $(".lead-popup").attr("data-route", route);
                $(".lead-popup").attr("data-score", score);
                $(".lead-popup").attr("data-titulo", titulo);
                $(".lead-popup").attr("data-id", id);
            }, 300);
        }
        else if ($.cookie('qualpopup') == '2') {
            $(".lead-overlay-2").addClass("active");
            setTimeout(function () {
                $(".lead-popup").attr("data-link", link);
                $(".lead-popup").attr("data-route", route);
                $(".lead-popup").attr("data-score", score);
                $(".lead-popup").attr("data-titulo", titulo);
                $(".lead-popup").attr("data-id", id);
                if ($.cookie('email') != null) {
                    $(".formPopup1 .email").val($.cookie('email'));
                    $(".formPopup1 .email").attr("readonly", "readonly");
                }
            }, 300);
        }
        else {
            var usuario = [];
            usuario.push('Guid,' + $.cookie('OkoshiGuid'));
            if ($.cookie('email') != null)
                usuario.push('Email,' + $.cookie('email'));
            if ($.cookie('nome') != null)
                usuario.push('Nome,' + $.cookie('nome'));
            usuario.push('Acao,' + titulo);
            usuario.push('Origem,' + score);
            usuario.push('AcaoID,' + (id != "" && id != null ? id : 0));

            $.cookie('usuario', JSON.stringify(usuario), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
            $.cookie('usuario', JSON.stringify(usuario), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
            $.cookie('usuario', JSON.stringify(usuario), { expires: 1000, path: '/', domain: 'localhost' });

            $.getJSON('/Home/GravaAcao', { "valor": JSON.stringify(usuario), "tipoID": score, 'pulou': 'false' }, function (data) { });

            setTimeout(function () {

                if (route == 'artigo' || route == 'ebook') {
                    window.open(link);
                }
                else if (route == 'video') {
                    if (!(navigator.userAgent).match(/Mobile/i)) {
                        video(link.split('=')[1], titulo);
                    }
                    else {
                        window.open(link);
                    }
                }
                else {
                    if (link != '' && link != undefined && link != '#') {
                        window.open(link);
                    }
                }

            }, 500);
        }
    }
    else {
        var link = "";
        if ($(value).attr("data-link") != null) {
            link = $(value).attr("data-link");
        }
        else if ($(value).attr("href") != null) {
            link = $(value).attr("href");
        }

        var usuario = [];
        usuario.push('Guid,' + $.cookie('OkoshiGuid'));
        if ($.cookie('email') != null)
            usuario.push('Email,' + $.cookie('email'));
        if ($.cookie('nome') != null)
            usuario.push('Nome,' + $.cookie('nome'));
        usuario.push('Acao,' + $(value).attr("data-titulo"));
        usuario.push('Origem,' + score);
        usuario.push('AcaoID,' + ($(value).attr("data-id") != "" && $(value).attr("data-id") != null ? $(value).attr("data-id") : 0));

        $.cookie('usuario', JSON.stringify(usuario), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
        $.cookie('usuario', JSON.stringify(usuario), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
        $.cookie('usuario', JSON.stringify(usuario), { expires: 1000, path: '/', domain: 'localhost' });

        $.getJSON('/Home/GravaAcao', { "valor": JSON.stringify(usuario), "tipoID": score, 'pulou': 'false' }, function (data) {

            if (link != '' && link != undefined && link != '#') {

                if ($(value).attr('target') == "_blank") {
                    if (link != "") {
                        window.open(link);
                    }
                } else if ($(value).attr('target') == undefined) {
                    if (link != "") {
                        document.location.href = link;
                    }
                }
            }

        });
    }
}

// Video
window.video = function (url, nome) {
    var valor = '' +
        '<div class="dialog-overlay">' +
        '   <div class="dialog-box" data-route="video">' +
        '       <div class="close-button closeAlert"></div>' +
        '       <div class="content">' +
        '           <h2>' + nome + '</h2>' +
        '           <iframe width="854" height="480" src="https://www.youtube.com/embed/' + url + '?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>' +
        '       </div>' +
        '   </div>' +
        '</div>';

    $('.videoSite').append(valor);

    $(".dialog-overlay").fadeIn(300, function () {
        var dialogHeight = $(this).find(".dialog-box .content").outerHeight();
        var dialogWidth = $(this).find(".dialog-box .content").outerWidth();

        $(this).find(".dialog-box").css({ "margin-top": -(dialogHeight / 2), "margin-left": -(dialogWidth / 2) });
        $(this).find(".dialog-box").fadeTo(300, 1);
    });

    $('.closeAlert').click(function (e) {
        e.preventDefault();
        $(".dialog-overlay").fadeOut(300, function () {
            $('.videoSite').empty();
        });
    });
}
// Fim Video

$(function () {

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        return vars;
    }

    $('.hiddenGuid').attr('value', $.cookie('OkoshiGuid'));
    var url = window.location.href.toLowerCase();
    var usuario = [];

    var utm_source = getUrlVars()["utm_source"];
    if (utm_source == "undefined" || utm_source == undefined)
        utm_source = '';

    if (utm_source != '') {

        var codigo = getUrlVars()["codigo"];
        if (codigo == "undefined" || codigo == undefined)
            codigo = '';

        var score = getUrlVars()["score"];
        if (score == "undefined" || score == undefined)
            score = '';

        usuario.push('Guid,' + $.cookie('OkoshiGuid'));
        if ($.cookie('email') != null)
            usuario.push('Email,' + $.cookie('email'));
        if ($.cookie('nome') != null)
            usuario.push('Nome,' + $.cookie('nome'));
        usuario.push('Acao,' + window.location.href);
        usuario.push('AcaoID,' + (codigo != "" ? codigo : 0));
        usuario.push('Origem,7');

        $.cookie('usuario', JSON.stringify(usuario), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
        $.cookie('usuario', JSON.stringify(usuario), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
        $.cookie('usuario', JSON.stringify(usuario), { expires: 1000, path: '/', domain: 'localhost' });
        $.getJSON('/Home/GravaAcao', { "valor": JSON.stringify(usuario), "tipoID": 7, 'pulou': 'false' }, function (data) { });
    }
    else if (
        url == 'https://www.okoshi.com.br/' || url == 'https://www.okoshi.com.br' || url == 'https://okoshi.com.br/' || url == 'https://okoshi.com.br' ||
        url == 'http://www.okoshi.com.br/' || url == 'http://www.okoshi.com.br' || url == 'http://okoshi.com.br/' || url == 'http://okoshi.com.br' ||
        url == 'http://okoshi.aprovacao.act1.com.br/' || url == 'http://okoshi.aprovacao.act1.com.br' ||
        url == 'http://localhost:41130/' || url == 'http://localhost:41130') {

        usuario.push('Guid,' + $.cookie('OkoshiGuid'));
        if ($.cookie('email') != null)
            usuario.push('Email,' + $.cookie('email'));
        if ($.cookie('nome') != null)
            usuario.push('Nome,' + $.cookie('nome'));
        usuario.push('Acao,Home - Visitou site');
        usuario.push('Origem,10');

        $.cookie('usuario', JSON.stringify(usuario), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
        $.cookie('usuario', JSON.stringify(usuario), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
        $.cookie('usuario', JSON.stringify(usuario), { expires: 1000, path: '/', domain: 'localhost' });
        $.getJSON('/Home/GravaAcao', { "valor": JSON.stringify(usuario), "tipoID": 7, 'pulou': 'false' }, function (data) { });
    }
});

$(window).bind("load", function () {
    $('.score').each(function (i) {
        $(this).click(function (e) {
            e.preventDefault();
            clickScore(this);
        });
    });
});