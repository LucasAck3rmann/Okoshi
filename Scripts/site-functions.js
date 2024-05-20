$(function () {

    if ((navigator.userAgent).match(/Mobile/i)) {
        //reset bg fixed for mobile
        resetBgFixed();
    }

    //menu click
    if ($("body").hasClass("home")) {
        $("ul.main-menu li a[data-link-home='true']").click(function (e) {
            e.preventDefault();

            var $link = $(this);

            var url = $(this).attr("href").replace("/", "").replace("#", "");
            var distance = $("[data-section-name='" + url + "']").offset().top;

            window.location.hash = "#" + url;

            if (!(navigator.userAgent).match(/Mobile/i)) {
                if (url == "depoimentos") {
                    var distance = $("[data-section-name='" + url + "']").offset().top - 76;
                }


                $("html,body").animate({ scrollTop: distance }, 'slow', function () {
                    setTimeout(function () {
                        $link.addClass("active");
                    }, 100);
                });

            }
            else {
                $("html,body").animate({ scrollTop: distance - 60 }, 'slow', function () {
                    setTimeout(function () {
                        $link.addClass("active");
                    }, 100);
                });
            }

            if ($("header").hasClass("menu-opened")) {
                $("header").removeClass("menu-opened");
            }
        });

        $(window).scroll(function () {
            $("ul.main-menu li a[data-link-home='true']").removeClass("active");
        });
    }


    //menu button mobile
    if ((navigator.userAgent).match(/Mobile/i)) {
        $("header .menu-button").click(function () {
            $("header").toggleClass("menu-opened");
        });
    }

    //search button
    $("header .content nav .login-box .wrapper .form .buttons li .search-button").click(function (e) {
        e.preventDefault();

        $("header .content nav .login-box .wrapper .form .buttons li .search-box").toggleClass("active");
    });

    $('.search-box .btnEnviar').click(function (e) {
        e.preventDefault();

        var text = $(this).parents('.search-box').find('.txt-buscar').val();
        if (text != '') {
            window.location.href = "/Busca/" + text;
        }

    });

    //home banner
    if ($("section.home").length > 0) {
        index = 0;
        rotative = true;
        staticTime = 12000;
        transitionTime = 500;
        currentBanner = null;

        $("section.home .walk .item:visible").each(function () {
            $("section.home .nav-buttons").append("<li/>");
        });

        $("section.home .nav-buttons li").each(function (i) {
            $(this).click(function () {
                clearInterval(currentBanner);
                index = i;
                animateBanner(index);
            });
        });

        if ((navigator.userAgent).match(/Mobile/i)) {
            $("section.home").swipe({
                swipe: function (event, direction, distance, duration, fingerCount) {
                    if (direction == "left") {
                        clearInterval(currentBanner);
                        index = ++index % $("section.home .walk .item:visible").length;
                        animateBanner(index);
                    }
                    else if (direction == "right") {
                        clearInterval(currentBanner);
                        index = --index % $("section.home .walk .item:visible").length;
                        animateBanner(index);
                    }
                },
                excludedElements: "button, input, select, textarea, .noSwipe",
                threshold: 50,
                allowPageScroll: "vertical"
            });
        }

        function animateBanner(i) {
            $("section.home .nav-buttons li").removeClass("active");
            $("section.home .nav-buttons li").eq(i).addClass("active");

            var position = $("section.home .walk .item:visible").eq(i).position().left;
            $("section.home .walk").animate({ "left": -position }, 700);

        };

        function tempoBanner() {
            if (currentBanner != null) {
                clearInterval(currentBanner);
            }

            currentBanner = setInterval(function () {
                index = ++index % $("section.home .walk .item:visible").length;
                animateBanner(index);
            }, staticTime);
        };
        if (rotative == true) {
            tempoBanner();
        };

        animateBanner(0);
    }

    //solutions / partners
    if ($("section.products").length > 0) {
        $("section.products .walk .item").each(function (i) {
            $(this).find(".content .title-grid .button").click(function (e) {
                e.preventDefault();

                if ($(this).hasClass("next")) {
                    var position = $("section.products .walk .item").eq(i + 1).position().left;
                }
                else {
                    var position = $("section.products .walk .item").eq(i - 1).position().left;
                }

                $("section.products .walk").stop().animate({ "left": -position }, 700);


                if ((navigator.userAgent).match(/Mobile/i)) {
                    var slideHeight = $("section.products .walk .item").eq(i).find(".content").outerHeight();

                    $("section.products .walk").stop().animate({ "height": slideHeight, "left": -position }, 700);
                    $("section.products").stop().animate({ "height": slideHeight }, 700);
                }
            });
        });
    }

    //events
    if ($("section.contents").length > 0) {
        $("section.contents .content .events .tabs li").each(function (i) {
            $(this).click(function () {
                $(this).parent().find("li").removeClass("active");
                $(this).addClass("active");

                var position = $("section.contents .content .events .slide .walk .item").eq(i).position().left;
                $("section.contents .content .events .slide .walk").stop().animate({ "left": -position }, 500);
            });
        });

        $("section.contact .content .grid .form .tabs li:first").click();
    }

    //contact
    if ($("section.contact").length > 0) {
        $("section.contact .content .grid .form .tabs li").each(function (i) {
            $(this).click(function () {
                $(this).parent().find("li").removeClass("active");
                $(this).addClass("active");

                $("section.contact .content .grid .form .form-item").slideUp(500);
                $("section.contact .content .grid .form .form-item").eq(i).slideDown(500);
            });
        });

        $("section.contact .content .grid .form .tabs li:first").click();
    }


    //go to page
    $(".go-to-page").each(function () {
        $(this).click(function (e) {
            e.preventDefault();

            var url = $(this).attr("href").replace("#", "").replace("/", "");

            var distance = $("[data-section-name='" + url + "']").offset().top;

            console.log(distance);

            if (!(navigator.userAgent).match(/Mobile/i)) {

                $("html,body").animate({ scrollTop: distance }, 'slow');

            }
            else {
                $("html,body").animate({ scrollTop: distance - 60 });
            }
        });
    });

    //Orcamento - Botão Continuar do Pop-up
    $(".continuar-orcamento").click(function (e) {

        var time_expires = 60 / 1440; /*=> 60 minutos;*/
        $.cookie('ck-orcamento-pular', "pulou", { expires: time_expires, path: '/', domain: '.okoshi.com.br' });
        $.cookie('ck-orcamento-pular', "pulou", { expires: time_expires, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
        $.cookie('ck-orcamento-pular', "pulou", { expires: time_expires, path: '/', domain: 'localhost' });

        $(".pop-up-continue.not-logged").removeClass("active");

        e.preventDefault();
        $(".nome").val('');
        var prod = $(".orcamento-sem-carrinho").attr("data-produto");
        var ref = $(".orcamento-sem-carrinho").attr("data-referencia");
        $(".act-popup-overlay .produto").val(prod);
        $(".act-popup-overlay .referencia").val(ref);
        $(".budget-button .produtoContent").show();
        $(".act-popup-overlay").removeClass("closed");
    });

    //Orcamento - Botão Cadastrar do Pop-up
    $(".cadastrar-orcamento").click(function () {

        var time_expires = 10 / 1440; /*=> 10 minutos;*/
        $.cookie('ck-orcamento-cadastrar', window.location.href, { expires: time_expires, path: '/', domain: '.okoshi.com.br' });
        $.cookie('ck-orcamento-cadastrar', window.location.href, { expires: time_expires, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
        $.cookie('ck-orcamento-cadastrar', window.location.href, { expires: time_expires, path: '/', domain: 'localhost' });
        
    });

    //Abrir pop-up de orçamento sem carrinho - Home
    //$(".orcamento-sem-carrinho-home").click(function (e) {

    //    if ($(".login-box .wrapper").hasClass("not-logged-in")) {
    //        if ($.cookie('ck-orcamento') == "" || $.cookie('ck-orcamento') == null) {
    //            if ($.cookie('ck-orcamento-pular') == "" || $.cookie('ck-orcamento-pular') == null) {

    //                //Primeira vez que clicou no botão
    //                var time_expires = 60 / 1440; /*=> 60 minutos;*/

    //                var ck_data = new Date();
    //                $.cookie('ck-orcamento', ck_data, { expires: time_expires, path: '/', domain: '.okoshi.com.br' });
    //                $.cookie('ck-orcamento', ck_data, { expires: time_expires, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
    //                $.cookie('ck-orcamento', ck_data, { expires: time_expires, path: '/', domain: 'localhost' });
    //            }

    //            e.preventDefault();
    //            $(".budget-button .produtoContent").show();
    //            $(".act-popup-overlay").removeClass("closed");
    //        }
    //        else {
    //            if ($.cookie('ck-orcamento-pular') == "" || $.cookie('ck-orcamento-pular') == null) {
    //                $(".pop-up-continue.not-logged").addClass("active");
    //            }
    //            else {
    //                e.preventDefault();
    //                $(".budget-button .produtoContent").show();
    //                $(".act-popup-overlay").removeClass("closed");
    //            }
    //        }
    //    }
    //    else {
    //        e.preventDefault();
    //        $(".budget-button .produtoContent").show();
    //        $(".act-popup-overlay").removeClass("closed");
    //    }
    //});

    //////////////////////////////////////////////////////INNER PAGES//////////////////////////////////////////////////////
    if ($(".page-content>.content .text-column .accordion").length > 0) {
        $(".page-content>.content .text-column .accordion .item").each(function () {
            $(this).find(".title").click(function (e) {
                e.preventDefault();

                $(this).toggleClass("active");
                $(this).parent().find(".content").slideToggle(500);
            });
        });
    }
    
    //recovery password
    //show recovery-password 
    if ($(".default-form fieldset a.forget-password").length > 0) {
        $(".login .row .col-md-6 .grid .form-item").each(function (i) {
            var formIndex = i;

            $(this).find(".default-form fieldset a.link").click(function (e) {
                e.preventDefault();

                $(this).parents(".form-item").slideUp(300);
                $(this).parents(".grid").find(".form-item").each(function (i) {
                    if (i != formIndex) {
                        $(this).slideDown(300);
                    }
                    else {
                        $(this).slideUp;
                    }
                });
            });
        });
    }

    //Orçamento - Pop-up
    $('.vg-orcamento-pop-up .btnEnviar').click(function (e) {

        var nome = $(this).parents('.vg-orcamento-pop-up').find('.nome');
        var email = $(this).parents('.vg-orcamento-pop-up').find('.email');
        var telefone = $(this).parents('.vg-orcamento-pop-up').find('.telCel');
        var empresa = $(this).parents('.vg-orcamento-pop-up').find('.empresa');
        var produto = $(this).parents('.vg-orcamento-pop-up').find('.produto');

        var retorno = ValidateGroup('.vg-orcamento-pop-up .btnEnviar');

        if (retorno) {
            $('.loading').fadeIn();

            $.cookie('nome', nome.val(), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
            $.cookie('nome', nome.val(), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
            $.cookie('nome', nome.val(), { expires: 1000, path: '/', domain: 'localhost' });

            $.cookie('email', email.val(), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
            $.cookie('email', email.val(), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
            $.cookie('email', email.val(), { expires: 1000, path: '/', domain: 'localhost' });

            $.cookie('telefone', telefone.val(), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
            $.cookie('telefone', telefone.val(), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
            $.cookie('telefone', telefone.val(), { expires: 1000, path: '/', domain: 'localhost' });

            $.cookie('empresa', empresa.val(), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
            $.cookie('empresa', empresa.val(), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
            $.cookie('empresa', empresa.val(), { expires: 1000, path: '/', domain: 'localhost' });

            $.cookie('qualpopup', "3", { expires: 1000, path: '/', domain: '.okoshi.com.br' });
            $.cookie('qualpopup', "3", { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
            $.cookie('qualpopup', "3", { expires: 1000, path: '/', domain: 'localhost' });

            if (produto.val() != "" && produto.val() != null) {
                if ($.cookie('ck-orcamento-pular') == "" || $.cookie('ck-orcamento-pular') == null) {

                    //Primeira vez que clicou no botão
                    var time_expires = 60 / 1440; /*=> 60 minutos;*/

                    var ck_data = new Date();
                    $.cookie('ck-orcamento', ck_data, { expires: time_expires, path: '/', domain: '.okoshi.com.br' });
                    $.cookie('ck-orcamento', ck_data, { expires: time_expires, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
                    $.cookie('ck-orcamento', ck_data, { expires: time_expires, path: '/', domain: 'localhost' });
                }
            }            
        }
    });

    //Fale Conosco - Home
    $('.vg-fale-conosco .btnEnviar').click(function (e) {

        var nome = $(this).parents('.vg-fale-conosco').find('.nome');
        var email = $(this).parents('.vg-fale-conosco').find('.email');
        var empresa = $(this).parents('.vg-fale-conosco').find('.empresa');
        var telefone = $(this).parents('.vg-fale-conosco').find('.tel');

        var retorno = ValidateGroup('.vg-fale-conosco .btnEnviar');

        if (retorno) {
            $('.loading').fadeIn();

            $.cookie('nome', nome.val(), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
            $.cookie('nome', nome.val(), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
            $.cookie('nome', nome.val(), { expires: 1000, path: '/', domain: 'localhost' });

            $.cookie('email', email.val(), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
            $.cookie('email', email.val(), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
            $.cookie('email', email.val(), { expires: 1000, path: '/', domain: 'localhost' });

            $.cookie('empresa', empresa.val(), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
            $.cookie('empresa', empresa.val(), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
            $.cookie('empresa', empresa.val(), { expires: 1000, path: '/', domain: 'localhost' });

            $.cookie('telefone', telefone.val(), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
            $.cookie('telefone', telefone.val(), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
            $.cookie('telefone', telefone.val(), { expires: 1000, path: '/', domain: 'localhost' });

            $.cookie('qualpopup', "3", { expires: 1000, path: '/', domain: '.okoshi.com.br' });
            $.cookie('qualpopup', "3", { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
            $.cookie('qualpopup', "3", { expires: 1000, path: '/', domain: 'localhost' });
        }
    });

    //Assistência Técnica - Home
    $('.vg-assistencia-tec .btnEnviar').click(function (e) {

        var nome = $(this).parents('.vg-assistencia-tec').find('.nome');
        var email = $(this).parents('.vg-assistencia-tec').find('.email');
        var empresa = $(this).parents('.vg-assistencia-tec').find('.empresa');
        var telefone = $(this).parents('.vg-assistencia-tec').find('.tel');

        var retorno = ValidateGroup('.vg-assistencia-tec .btnEnviar');

        if (retorno) {
            $('.loading').fadeIn();

            $.cookie('nome', nome.val(), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
            $.cookie('nome', nome.val(), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
            $.cookie('nome', nome.val(), { expires: 1000, path: '/', domain: 'localhost' });

            $.cookie('email', email.val(), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
            $.cookie('email', email.val(), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
            $.cookie('email', email.val(), { expires: 1000, path: '/', domain: 'localhost' });

            $.cookie('empresa', empresa.val(), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
            $.cookie('empresa', empresa.val(), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
            $.cookie('empresa', empresa.val(), { expires: 1000, path: '/', domain: 'localhost' });

            $.cookie('telefone', telefone.val(), { expires: 1000, path: '/', domain: '.okoshi.com.br' });
            $.cookie('telefone', telefone.val(), { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
            $.cookie('telefone', telefone.val(), { expires: 1000, path: '/', domain: 'localhost' });

            $.cookie('qualpopup', "3", { expires: 1000, path: '/', domain: '.okoshi.com.br' });
            $.cookie('qualpopup', "3", { expires: 1000, path: '/', domain: '.okoshi.aprovacao.act1.com.br' });
            $.cookie('qualpopup', "3", { expires: 1000, path: '/', domain: 'localhost' });
        }
    });

    //Trabalhe Conosco - Home
    $('.vg-trabalhe-conosco .btnEnviar').click(function (e) {
        var retorno = ValidateGroup('.vg-trabalhe-conosco .btnEnviar');

        if (retorno) {
            $('.loading').fadeIn();
        }
    });

    //Cadastro de Clientes
    $(".register .salvaCad").click(function (e) {

        if ($(".senha1").val() != "" && $(".senha2").val() != "") {

            var passou = false;
            var senha = $(".senha1").val().trim();
            var confsenha = $(".senha2").val().trim();
            var ma = senha.replace(/[^A-Z]/g, '');
            var mi = senha.replace(/[^a-z]/g, '');
            var nu = senha.replace(/[^0-9]/g, '');

            if (ma.length < 1 && mi.length < 1 && passou == false) {
                passou = true;

                actboxAlert("Dados Cadastrais", "Senha deve conter ao menos uma letra!");
            }

            if (nu.length < 1 && passou == false) {
                passou = true;
                actboxAlert("Dados Cadastrais", "Senha deve conter ao menos um número!");
            }

            if (senha.length < 8 && passou == false) {
                passou = true;
                actboxAlert("Dados Cadastrais", "Senha deve conter no mínimo 8 caracteres!");
            }

            if (senha != confsenha && passou == false) {
                passou = true;
                actboxAlert("Dados Cadastrais", "Senha e Confirmação de Senha não conferem!");
            }

            if (!$(".cbxTermos").is(":checked") && passou == false) {
                passou = true;
                actboxAlert("Dados Cadastrais", "Leia e assinale os Termos e Condiçõoes para confirmar o cadastro!");
            }

            if (passou)
                e.preventDefault();
        }
        else {
            e.preventDefault();
        }
    });
    
    //Lista de Eventos
    function CarregaListaEventos(np, tipo) {

        $(".listaEventosNavigate").html("");
        $.getJSON('/webservice/eventolistapaginada?nPagina=' + np + '&tipo=' + tipo, function (data) {

            if (data.lista.length > 0) {

                $(".loading").show();

                var eventoItens = "";

                for (var i = 0; i < data.lista.length; i++) {

                    eventoItens += '' +
                        '<article class="col-md-6">' +
                        '  <a href="' + data.lista[i].SEUrl + '" title="' + data.lista[i].Nome + '">' +
                        '      <figure>' +
                        '          <img src="' + data.lista[i].Imagem + '" alt="' + data.lista[i].Nome + '" />' +
                        '      </figure>' +
                        '      <div class="text">' +
                        '          <h2 class="title">' + data.lista[i].Nome + '</h2>' +
                        '          <time>';
                    if (data.lista[i].Data != null) {
                        eventoItens += data.lista[i].Data;
                    }
                    eventoItens += '</time>' +
                        '         <p>' + data.lista[i].Descricao + '</p>' +
                        '      </div> ' +
                        '  </a>' +
                        '</article>';
                }

                if (eventoItens != "")
                    $(".listaEventosNavigate").append('<div class="row">' + eventoItens + '</div>');

                if (data.qPaginas != "1") {
                    var paginacao = '<div class="page-nav">';

                    if (np != "1") {
                        var pg = parseInt(np) - 1;
                        paginacao += '<a href="#" data-val="1" class="nav first btevento" title="Primeira página"><span class="ion-ios-rewind"></span></a>';
                        paginacao += '<a href="#" data-val="' + pg + '" class="nav prev reflect btevento" title="Anterior"><span class="ion-ios-play"></span></a>';
                    }
                    else {
                        paginacao += '<a href="#" class="nav first inactive" title="Primeira página"><span class="ion-ios-rewind"></span></a>';
                        paginacao += '<a href="#" data-val="1" class="nav prev reflect inactive" title="Anterior"><span class="ion-ios-play"></span></a>';
                    }

                    paginacao += '<ul>';

                    var tp = parseInt(data.qPaginas);
                    for (var j = 0; j < tp; j++) {
                        var pg = (j + 1);
                        paginacao += '<li ' + (pg == np ? "class='nav active'" : "class='nav'") + ' ><a href="#" data-val="' + pg + '" title="Página ' + pg + '" class="btevento" >' + pg + '</a></li>';
                    }

                    paginacao += '</ul>';

                    if (np != (data.qPaginas)) {
                        var pg = parseInt(np) + 1;
                        paginacao += '<a href="#" data-val="' + pg + '" class="nav next btevento" title="Próxima"><span class="ion-ios-play"></span></a>';
                        paginacao += '<a href="#" data-val="' + data.qPaginas + '" class="nav last reflect btevento" title="Última página"><span class="ion-ios-rewind"></span></a>';
                    }
                    else {
                        paginacao += '<a href="#" class="nav next inactive" title="Próxima"><span class="ion-ios-play"></span></a>';
                        paginacao += '<a href="#" class="nav last reflect inactive" title="Última página"><span class="ion-ios-rewind"></span></a>';
                    }

                    paginacao += '</div>';

                    $(".listaEventosNavigate").append(paginacao);

                    webpImages();

                    $('.btevento').click(function (evt) {
                        var pg = $(this).attr("data-val");
                        console.log(pg + ' - ' + tipo);
                        CarregaListaEventos(pg, tipo);
                    });
                }

                $(".loading").fadeOut(300);
            }
            else
                console.log('Falha ao carregar os Eventos!');
        });
    }

    var url_atual = window.location.href;
    if (url_atual.toLocaleLowerCase().indexOf('/congressos') != -1) {
        CarregaListaEventos("1", "congresso");
    }

    if (url_atual.toLocaleLowerCase().indexOf('/workshops') != -1) {
        CarregaListaEventos("1", "workshop");
    }

    //Página de Busca
    function CarregaBusca(np, palavra) {

        $(".listaBuscaNavigate").html("");
        $(".item-busca").html(decodeURIComponent(palavra));
        $(".no-search-results").hide();

        $.getJSON('/webservice/produtobuscapaginada?nPagina=' + np + '&palavra=' + palavra, function (data) {
            
            if (data != null) {

                if (data.lista.length > 0) {

                    $(".loading").show();

                    var buscaItens = "";

                    for (var i = 0; i < data.lista.length; i++) {

                        buscaItens += '' +
                            '<article>' +
                            '    <a href="' + data.lista[i].Url + '" title="' + data.lista[i].Nome + '" data-score="10" data-titulo="Categoria - Clique Produto ' + data.lista[i].Nome + '" class="score2">' +
                            '        <figure>';
                        if (data.lista[i].Imagem != null) {
                            buscaItens += '<img src="' + data.lista[i].Imagem + '" alt="' + data.lista[i].Nome + '" />';
                        }
                        buscaItens += '        </figure>' +
                            '        <div class="info">' +
                            '            <h2 class="product-name">' + data.lista[i].Nome + '</h2>';
                        if (data.lista[i].Marca != null) {
                            buscaItens += '<h3 class="product-brand"><strong>Marca:</strong> ' + data.lista[i].Marca + '</h3>';
                        }
                        if (data.lista[i].Tipo != null) {
                            buscaItens += '<h3 class="product-brand"><strong>Classificação:</strong> ' + data.lista[i].Tipo + '</h3>';
                        }
                        buscaItens += '        </div>' +
                            '    </a>' +
                            '</article>';
                    }

                    if (buscaItens != "")
                        $(".listaBuscaNavigate").append('<div class="row">' + buscaItens + '</div>');

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

$(window).bind("load", function () {

    if ($(".page-content.products").length <= 0) {

        //pre loading
        $(".loading").fadeOut(300, function () {

            if (!$("body").hasClass("inner")) {
                var hash = document.location.hash;

                if (hash != "") {
                    $("ul.main-menu li a[href='/" + hash + "']").click();
                }
            }
        });

    }

    //scroll anchor
    if ($("body").hasClass("inner")) {
        var hash = document.location.hash.replace("#", "");

        if (hash != "" && hash != "recuperar-senha") {
            var position = $("[data-anchor='" + hash + "']").offset().top;

            $("html, body").stop().animate({ scrollTop: position - 49 }, 1000);
        }
        else if (hash == "recuperar-senha") {
            $(".page-content>.content .default-form fieldset a.link.forget-password").click();
        }
    }
});

function resetBgFixed() {
    $("*").each(function () {
        if ($(this).css("background-attachment") == "fixed") {
            $(this).css("background-attachment", "scroll");
        }
    });
}

function animateRelatedProducts(i) {
    var position = $(".page-content.products>.content .related-products .slide .grid .walk figure").eq(i).position().left;
    $(".page-content.products>.content .related-products .slide .grid .walk").stop().animate({ "left": -position }, 400);
}


function animateBrands(i) {
    var position = $(".page-content.products>.content .brands-slide .grid .walk .item").eq(i).position().left;
    $(".page-content.products>.content .brands-slide .grid .walk").stop().animate({ "left": -position }, 400);
}
