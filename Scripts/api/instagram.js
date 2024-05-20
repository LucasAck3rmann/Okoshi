function CarregarInstagramAPI() {
    var tokken = "IGQVJYQTdTaXdadjhIXzJmQzdqdk9rTVBZASDNpZA0ZAtNjZASVzFkN3haSkZA0dWJZAOTNHanI5S092V0J3QXpWTXFveVZAKT2N1LTUyOVVNdXZA6NlIwOFdyNGFpOWIzUGk5d28zQkRHS1Jn";
    $.ajax({
        url: 'https://graph.instagram.com/me/media?fields=caption,media_url,media_type,permalink,timestamp,username,thumbnail_url&access_token=' + tokken,
        dataType: 'jsonp',
        type: 'GET',
        cache: false,
        success: function (data) {
            $(".instagramAPI").html('');
            //console.log(data);
            if (data.data.length > 0) {
                var linhas = "";
                var contador = parseInt(data.data.length);
                if (contador > 6)
                    contador = 6;
                for (var i = 0; i < contador; i++) {

                    var caption = data.data[i].caption;
                    if (caption.length > 60)
                        caption = caption.substring(60, 0) + '...';

                    if (data.data[i].media_type == "VIDEO") {
                        linhas += '<li><a href="' + data.data[i].permalink + '" target="_blank" title="' + caption + '"><img data-src="' + data.data[i].thumbnail_url + '" alt="' + caption + '" /></a></li>';
                    }
                    else {
                        linhas += '<li><a href="' + data.data[i].permalink + '" target="_blank" title="' + caption + '"><img data-src="' + data.data[i].media_url + '" alt="' + caption + '" /></a></li>';
                    }
                }
                $(".instagramAPI").append(linhas);
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}
CarregarInstagramAPI();