(function () {
    'use strict';

    app.controller('categoria-divisao-analitica', function ($scope, $http) {
        $(window).load(function () {
            $http.get('/divisao_analitica/lista').then(function (ret) {
                $scope.categoriaDivisaoAnaliticaItens = ret.data;
                
                //filtro na tela de categoria - opções
                $(".filtro-categorias-opc").change(function () {

                    $(".filtro-marca").val('');
                    $(".filtro-linha").val('');
                    $(".filtro-tipo").val('');

                    if ($(this).val() == "Marca") {
                        $(".filtro-linha-div").hide();
                        $(".filtro-tipo-div").hide();
                        $(".filtro-marca-div").show();
                    }
                    else if ($(this).val() == "Linha") {
                        $(".filtro-marca-div").hide();
                        $(".filtro-tipo-div").hide();
                        $(".filtro-linha-div").show();
                    }
                    else if ($(this).val() == "Tipo") {
                        $(".filtro-marca-div").hide();
                        $(".filtro-linha-div").hide();
                        $(".filtro-tipo-div").show();
                    }
                    else {
                        $(".filtro-marca-div").hide();
                        $(".filtro-linha-div").hide();
                        $(".filtro-tipo-div").hide();
                    }

                    $(".page-content.products .content .list article").each(function () {
                        var opc = $(this).attr("data-filtro-marca");
                        $(this).show();
                    });

                }).change();

                //filtro na tela de categoria - marca
                $(".filtro-marca").change(function () {

                    var valor = $(this).val();

                    if (valor != "")
                        var valor = ', ' + valor + ',';

                    $(".page-content.products .content .list article").each(function () {
                        var opc = $(this).attr("data-filtro-marca");
                        if (valor == "" || (opc.includes(valor))) {
                            $(this).show();
                        }
                        else {
                            $(this).hide();
                        }
                    });

                }).change();

                //filtro na tela de categoria - linha
                $(".filtro-linha").change(function () {

                    var valor = $(this).val();

                    if (valor != "")
                        var valor = ', ' + valor + ',';

                    $(".page-content.products .content .list article").each(function () {
                        var opc = $(this).attr("data-filtro-linha");
                        if (valor == "" || (opc.includes(valor))) {
                            $(this).show();
                        }
                        else {
                            $(this).hide();
                        }
                    });

                }).change();

                //filtro na tela de categoria - tipo
                $(".filtro-tipo").change(function () {

                    var valor = $(this).val();

                    if (valor != "")
                        var valor = ', ' + valor + ',';

                    $(".page-content.products .content .list article").each(function () {
                        var opc = $(this).attr("data-filtro-tipo");
                        if (valor == "" || (opc.includes(valor))) {
                            $(this).show();
                        }
                        else {
                            $(this).hide();
                        }
                    });

                }).change();

                //callback
                $scope.$on('LastRepeaterElement', function () {
                    webpImages();
                    $(".loading").fadeOut(300);
                });

                if (ret.data.length == 0) {
                    $(".loading").fadeOut(300);
                }

            });
        });
    });

    app.controller('categoria-divisao-industrial', function ($scope, $http) {
        $(window).load(function () {
            $http.get('/divisao_industrial/lista').then(function (ret) {
                $scope.categoriaDivisaoIndustrialItens = ret.data;

                //filtro na tela de categoria - opções
                $(".filtro-categorias-opc").change(function () {

                    $(".filtro-marca").val('');
                    $(".filtro-linha").val('');
                    $(".filtro-tipo").val('');

                    if ($(this).val() == "Marca") {
                        $(".filtro-linha-div").hide();
                        $(".filtro-tipo-div").hide();
                        $(".filtro-marca-div").show();
                    }
                    else if ($(this).val() == "Linha") {
                        $(".filtro-marca-div").hide();
                        $(".filtro-tipo-div").hide();
                        $(".filtro-linha-div").show();
                    }
                    else if ($(this).val() == "Tipo") {
                        $(".filtro-marca-div").hide();
                        $(".filtro-linha-div").hide();
                        $(".filtro-tipo-div").show();
                    }
                    else {
                        $(".filtro-marca-div").hide();
                        $(".filtro-linha-div").hide();
                        $(".filtro-tipo-div").hide();
                    }

                    $(".page-content.products .content .list article").each(function () {
                        var opc = $(this).attr("data-filtro-marca");
                        $(this).show();
                    });

                }).change();

                //filtro na tela de categoria - marca
                $(".filtro-marca").change(function () {

                    var valor = $(this).val();

                    if (valor != "")
                        var valor = ', ' + valor + ',';

                    $(".page-content.products .content .list article").each(function () {
                        var opc = $(this).attr("data-filtro-marca");
                        if (valor == "" || (opc.includes(valor))) {
                            $(this).show();
                        }
                        else {
                            $(this).hide();
                        }
                    });

                }).change();

                //filtro na tela de categoria - linha
                $(".filtro-linha").change(function () {

                    var valor = $(this).val();

                    if (valor != "")
                        var valor = ', ' + valor + ',';

                    $(".page-content.products .content .list article").each(function () {
                        var opc = $(this).attr("data-filtro-linha");
                        if (valor == "" || (opc.includes(valor))) {
                            $(this).show();
                        }
                        else {
                            $(this).hide();
                        }
                    });

                }).change();

                //filtro na tela de categoria - tipo
                $(".filtro-tipo").change(function () {

                    var valor = $(this).val();

                    if (valor != "")
                        var valor = ', ' + valor + ',';

                    $(".page-content.products .content .list article").each(function () {
                        var opc = $(this).attr("data-filtro-tipo");
                        if (valor == "" || (opc.includes(valor))) {
                            $(this).show();
                        }
                        else {
                            $(this).hide();
                        }
                    });

                }).change();

                //callback
                $scope.$on('LastRepeaterElement', function () {
                    webpImages();
                    $(".loading").fadeOut(300);
                });

                if (ret.data.length == 0) {
                    $(".loading").fadeOut(300);
                }

            });
        });
    });

    app.controller('categoria-reproducao-animal', function ($scope, $http) {
        $(window).load(function () {
            $http.get('/reproducao_animal/lista').then(function (ret) {
                $scope.categoriaReproducaoAnimalItens = ret.data;

                //filtro na tela de categoria - opções
                $(".filtro-categorias-opc").change(function () {

                    $(".filtro-marca").val('');
                    $(".filtro-linha").val('');
                    $(".filtro-tipo").val('');

                    if ($(this).val() == "Marca") {
                        $(".filtro-linha-div").hide();
                        $(".filtro-tipo-div").hide();
                        $(".filtro-marca-div").show();
                    }
                    else if ($(this).val() == "Linha") {
                        $(".filtro-marca-div").hide();
                        $(".filtro-tipo-div").hide();
                        $(".filtro-linha-div").show();
                    }
                    else if ($(this).val() == "Tipo") {
                        $(".filtro-marca-div").hide();
                        $(".filtro-linha-div").hide();
                        $(".filtro-tipo-div").show();
                    }
                    else {
                        $(".filtro-marca-div").hide();
                        $(".filtro-linha-div").hide();
                        $(".filtro-tipo-div").hide();
                    }

                    $(".page-content.products .content .list article").each(function () {
                        var opc = $(this).attr("data-filtro-marca");
                        $(this).show();
                    });

                }).change();

                //filtro na tela de categoria - marca
                $(".filtro-marca").change(function () {

                    var valor = $(this).val();

                    if (valor != "")
                        var valor = ', ' + valor + ',';

                    $(".page-content.products .content .list article").each(function () {
                        var opc = $(this).attr("data-filtro-marca");
                        if (valor == "" || (opc.includes(valor))) {
                            $(this).show();
                        }
                        else {
                            $(this).hide();
                        }
                    });

                }).change();

                //filtro na tela de categoria - linha
                $(".filtro-linha").change(function () {

                    var valor = $(this).val();

                    if (valor != "")
                        var valor = ', ' + valor + ',';

                    $(".page-content.products .content .list article").each(function () {
                        var opc = $(this).attr("data-filtro-linha");
                        if (valor == "" || (opc.includes(valor))) {
                            $(this).show();
                        }
                        else {
                            $(this).hide();
                        }
                    });

                }).change();

                //filtro na tela de categoria - tipo
                $(".filtro-tipo").change(function () {

                    var valor = $(this).val();

                    if (valor != "")
                        var valor = ', ' + valor + ',';

                    $(".page-content.products .content .list article").each(function () {
                        var opc = $(this).attr("data-filtro-tipo");
                        if (valor == "" || (opc.includes(valor))) {
                            $(this).show();
                        }
                        else {
                            $(this).hide();
                        }
                    });

                }).change();

                //callback
                $scope.$on('LastRepeaterElement', function () {
                    webpImages();
                    $(".loading").fadeOut(300);
                });

                if (ret.data.length == 0) {
                    $(".loading").fadeOut(300);
                }

            });
        });
    });

    app.controller('categoria-reproducao-humana', function ($scope, $http) {
        $(window).load(function () {
            $http.get('/reproducao_humana/lista').then(function (ret) {
                $scope.categoriaReproducaoHumanaItens = ret.data;

                //filtro na tela de categoria - opções
                $(".filtro-categorias-opc").change(function () {

                    $(".filtro-marca").val('');
                    $(".filtro-linha").val('');
                    $(".filtro-tipo").val('');

                    if ($(this).val() == "Marca") {
                        $(".filtro-linha-div").hide();
                        $(".filtro-tipo-div").hide();
                        $(".filtro-marca-div").show();
                    }
                    else if ($(this).val() == "Linha") {
                        $(".filtro-marca-div").hide();
                        $(".filtro-tipo-div").hide();
                        $(".filtro-linha-div").show();
                    }
                    else if ($(this).val() == "Tipo") {
                        $(".filtro-marca-div").hide();
                        $(".filtro-linha-div").hide();
                        $(".filtro-tipo-div").show();
                    }
                    else {
                        $(".filtro-marca-div").hide();
                        $(".filtro-linha-div").hide();
                        $(".filtro-tipo-div").hide();
                    }

                    $(".page-content.products .content .list article").each(function () {
                        var opc = $(this).attr("data-filtro-marca");
                        $(this).show();
                    });

                }).change();

                //filtro na tela de categoria - marca
                $(".filtro-marca").change(function () {

                    var valor = $(this).val();

                    if (valor != "")
                        var valor = ', ' + valor + ',';

                    $(".page-content.products .content .list article").each(function () {
                        var opc = $(this).attr("data-filtro-marca");
                        if (valor == "" || (opc.includes(valor))) {
                            $(this).show();
                        }
                        else {
                            $(this).hide();
                        }
                    });

                }).change();

                //filtro na tela de categoria - linha
                $(".filtro-linha").change(function () {

                    var valor = $(this).val();

                    if (valor != "")
                        var valor = ', ' + valor + ',';

                    $(".page-content.products .content .list article").each(function () {
                        var opc = $(this).attr("data-filtro-linha");
                        if (valor == "" || (opc.includes(valor))) {
                            $(this).show();
                        }
                        else {
                            $(this).hide();
                        }
                    });

                }).change();

                //filtro na tela de categoria - tipo
                $(".filtro-tipo").change(function () {

                    var valor = $(this).val();

                    if (valor != "")
                        var valor = ', ' + valor + ',';

                    $(".page-content.products .content .list article").each(function () {
                        var opc = $(this).attr("data-filtro-tipo");
                        if (valor == "" || (opc.includes(valor))) {
                            $(this).show();
                        }
                        else {
                            $(this).hide();
                        }
                    });

                }).change();

                //callback
                $scope.$on('LastRepeaterElement', function () {
                    webpImages();
                    $(".loading").fadeOut(300);
                });

                if (ret.data.length == 0) {
                    $(".loading").fadeOut(300);
                }

            });
        });
    });

    app.controller('evento-congresso-home', function ($scope, $http) {
        $(window).load(function () {
            $http.get('/home/congressolista').then(function (ret) {
                $scope.eventoCongressoHome = ret.data;
            });
        });
    });

    app.controller('evento-workshop-home', function ($scope, $http) {
        $(window).load(function () {
            $http.get('/home/workshoplista').then(function (ret) {
                $scope.eventoWorkshopHome = ret.data;
            });
        });
    });

    setTimeout(function () {
        //carrgar evento de clique do score do lead
        $('.score2').each(function (i) {
            $(this).click(function (e) {
                e.preventDefault();
                clickScore(this);
            });
        });
    }, 4000);

}());