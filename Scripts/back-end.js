$(function () {

    //SAC
    $('.vg-sac .btnEnviar').click(function (e) {

        var nome = $(this).parents('.vg-sac').find('.nome');
        var email = $(this).parents('.vg-sac').find('.email');
        var telefone = $(this).parents('.vg-sac').find('.telCel');
        var assunto = $(this).parents('.vg-sac').find('.assunto');
        var mensagem = $(this).parents('.vg-sac').find('.mensagem');
        var guid = $.cookie('OkoshiGuid');

        var retorno = ValidateGroup('.vg-sac .btnEnviar');

        if (retorno) {
            $('.loading').fadeIn();
            e.preventDefault();
            $.getJSON('/Home/Sac', {
                "nome": nome.val(), "email": email.val(), "telefone": telefone.val(), "assunto": assunto.val(), "mensagem": mensagem.val(), "GuidH": guid
            }, function (data) {
                if (data == 'deu') {

                    $.cookie('nome', nome.val(), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
                    $.cookie('nome', nome.val(), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
                    $.cookie('nome', nome.val(), { expires: 1000, path: '/', domain: 'localhost' });

                    $.cookie('email', email.val(), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
                    $.cookie('email', email.val(), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
                    $.cookie('email', email.val(), { expires: 1000, path: '/', domain: 'localhost' });

                    $.cookie('telefone', telefone.val(), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
                    $.cookie('telefone', telefone.val(), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
                    $.cookie('telefone', telefone.val(), { expires: 1000, path: '/', domain: 'localhost' });

                    $.cookie('qualpopup', "3", { expires: 1000, path: '/', domain: '.okoshi.com.br' });
                    $.cookie('qualpopup', "3", { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
                    $.cookie('qualpopup', "3", { expires: 1000, path: '/', domain: 'localhost' });

                    window.location.href = "/formulario-enviado-com-sucesso";
                }
                else {
                    window.location.href = "/";
                }
            });
        }
    });

    //Revenda
    $('.vg-revenda .btnEnviar').click(function (e) {

        var nome = $(this).parents('.vg-revenda').find('.nome');
        var email = $(this).parents('.vg-revenda').find('.email');
        var telefone = $(this).parents('.vg-revenda').find('.telCel');
        var cnpj = $(this).parents('.vg-revenda').find('.cnpj');
        var mensagem = $(this).parents('.vg-revenda').find('.mensagem');
        var guid = $.cookie('OkoshiGuid');

        var retorno = ValidateGroup('.vg-revenda .btnEnviar');

        if (retorno) {
            $('.loading').fadeIn();
            e.preventDefault();
            $.getJSON('/Home/Revenda', {
                "nome": nome.val(), "email": email.val(), "telefone": telefone.val(), "cnpj": cnpj.val(), "mensagem": mensagem.val(), "GuidH": guid
            }, function (data) {
                if (data == 'deu') {

                    $.cookie('nome', nome.val(), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
                    $.cookie('nome', nome.val(), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
                    $.cookie('nome', nome.val(), { expires: 1000, path: '/', domain: 'localhost' });

                    $.cookie('email', email.val(), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
                    $.cookie('email', email.val(), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
                    $.cookie('email', email.val(), { expires: 1000, path: '/', domain: 'localhost' });

                    $.cookie('telefone', telefone.val(), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
                    $.cookie('telefone', telefone.val(), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
                    $.cookie('telefone', telefone.val(), { expires: 1000, path: '/', domain: 'localhost' });

                    $.cookie('qualpopup', "3", { expires: 1000, path: '/', domain: '.okoshi.com.br' });
                    $.cookie('qualpopup', "3", { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
                    $.cookie('qualpopup', "3", { expires: 1000, path: '/', domain: 'localhost' });

                    window.location.href = "/formulario-revenda-enviado-com-sucesso";
                }
                else {
                    window.location.href = "/";
                }
            });
        }
    });

    //Busca no Topo do Site
    $('.search-box .bt-busca').click(function (e) {
        e.preventDefault();

        var text = $(this).parents('.search-box').find('.txt-buscar').val();
        if (text != '') {
            window.location.href = "/Busca/" + text;
        }
        else {
            $(this).parents('.search-box').find('.txt-buscar').addClass('error');
        }
    });

    //Acionar botão de busca com enter
    $(".search-box .txt-buscar").keydown(function (e) {
        console.log(e.keyCode);
        if (e.keyCode == 13) {
            e.preventDefault();
            $('.search-box .bt-busca').click();
        }        
    });

    //Página de Busca
    function CarregaBusca(np, palavra) {

        if (palavra.includes("?")) {
            palavra = palavra.split('?')[0];
        }

        $(".listaBuscaNavigate").html("");
        $(".item-busca").html(decodeURIComponent(palavra));
        $(".no-search-results").hide();

        $.getJSON('/webservice/produtobuscapaginada?nPagina=' + np + '&palavra=' + palavra, function (data) {

            if (data != null) {

                if (data.lista.length > 0) {

                    $(".loading").show();

                    var buscaItens = "";

                    for (var i = 0; i < data.lista.length; i++) {

                        buscaItens += '<article>';
                        buscaItens += '<a href="' + data.lista[i].Url + '" title="' + data.lista[i].Nome + '" data-score="10" data-titulo="Busca - Clique Produto ' + data.lista[i].Nome + '" class="score">';

                        buscaItens += '<figure>';

                        if (data.lista[i].Imagem != null && data.lista[i].Imagem != "") {
                            buscaItens += '<img src="' + data.lista[i].Imagem + '" alt="' + data.lista[i].Nome + '" />';
                        }

                        buscaItens += '</figure>';
                        buscaItens += '<h2 class="product-name purple">' + data.lista[i].Nome + '</h2>';

                        if (data.lista[i].Flag == true) {
                            buscaItens += '<span class="new"></span>';
                        }

                        buscaItens += '</a>';
                        buscaItens += '</article>';
                    }

                    if (buscaItens != "")
                        $(".listaBuscaNavigate").append(buscaItens);

                    if (data.qPaginas != "1") {
                        var paginacao = '<div class="page-nav">';

                        if (np != "1") {
                            var pg = parseInt(np) - 1;
                            paginacao += '<a href="#" data-val="1" class="nav first btpagina" title="Primeira página"><span class="ion-ios-rewind"></span></a>';
                            paginacao += '<a href="#" data-val="' + pg + '" class="nav prev reflect btpagina" title="Anterior"><span class="ion-ios-play"></span></a>';
                        }
                        else {
                            paginacao += '<a href="#" class="nav first inactive" title="Primeira página"><span class="ion-ios-rewind"></span></a>';
                            paginacao += '<a href="#" data-val="1" class="nav prev reflect inactive" title="Anterior"><span class="ion-ios-play"></span></a>';
                        }

                        paginacao += '<ul>';

                        var tp = parseInt(data.qPaginas);
                        for (var j = 0; j < tp; j++) {
                            var pg = (j + 1);
                            paginacao += '<li ' + (pg == np ? "class='active'" : "class=''") + ' ><a href="#" data-val="' + pg + '" title="Página ' + pg + '" class=" nav btpagina" >' + pg + '</a></li>';
                        }

                        paginacao += '</ul>';

                        if (np != (data.qPaginas)) {
                            var pg = parseInt(np) + 1;
                            paginacao += '<a href="#" data-val="' + pg + '" class="nav next btpagina" title="Próxima"><span class="ion-ios-play"></span></a>';
                            paginacao += '<a href="#" data-val="' + data.qPaginas + '" class="nav last reflect btpagina" title="Última página"><span class="ion-ios-rewind"></span></a>';
                        }
                        else {
                            paginacao += '<a href="#" class="nav next inactive" title="Próxima"><span class="ion-ios-play"></span></a>';
                            paginacao += '<a href="#" class="nav last reflect inactive" title="Última página"><span class="ion-ios-rewind"></span></a>';
                        }

                        paginacao += '</div>';

                        $(".listaBuscaNavigate").append(paginacao);

                        webpImages();

                        $('.btpagina').click(function () {
                            var pg = $(this).attr("data-val");
                            CarregaBusca(pg, palavra);
                        });
                    }
                }
                else
                    $(".no-search-results").show();

                $(".loading").fadeOut(300);
            }
            else {
                $(".no-search-results").show();
                console.log('Falha ao carregar os Produtos!');
            }

        });
    }

    var url_atual = window.location.href;
    if (url_atual.toLocaleLowerCase().indexOf('/busca') != -1) {
        var palavra = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        $(".item-busca").html(decodeURIComponent(palavra));
        CarregaBusca("1", palavra);
    }

});