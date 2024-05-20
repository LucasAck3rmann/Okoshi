(function () {
    'use strict';

    var postsQtt = null;

    app.controller('wordpressAPI', function ($scope, $http) {
        $(window).load(function () {            
            $http.get('/blog/wp-json/posts')
            //$http.get('/posts.json')
                .then(function (data) {
                    $scope.items = data.data;
                    postsQtt = $scope.items.length;
                });
        });
    });

    var intervalId = null;
    var countInterval = function () {

        if ($("section.blog .content .list article").length === 3 || $("section.blog .content .list article").length === postsQtt) {

            lazyLoading();

            //carrgar evento de clique do score do lead
            $('.score-blog').each(function (i) {
                $(this).click(function (e) {
                    e.preventDefault();
                    clickScore(this);
                });
            });

            clearInterval(intervalId);
        }
    };

    intervalId = setInterval(countInterval, 1000);
}());