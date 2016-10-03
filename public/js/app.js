var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June","July", "Aug", "Sep", "Oct", "Nov", "Dec"];

App.controller('home', function (page) {
    var resultSection = page.querySelector('.result-section');
    $.ajax({
        url : 'https://newsapi.org/v1/articles?source=techcrunch&sortBy=latest&apiKey=050583199ea94e0fbf34aa9f3ecd2e39',
        type : 'GET',
        success : function(data){
            response_data = JSON.parse(data);
            if(response_data["status"] == "ok"){
                loadResults(page,response_data["articles"]);
            }
            $(resultSection).removeClass("hidden");
        }
    });
});

try {
    App.restore();
} catch (err) {
    App.load('home');
}
function loadResults(page,articles){
    $(page).find('.no-results-found').hide();
    var $template = $(page).find('.article').remove();
    var $articles_results = $(page).find('.articles-results');
    if(articles.length != 0){
        articles.forEach(function (articleObj) {
            var $article = $template.clone(true);
            $article.find('.img-thumb').attr("src",articleObj.urlToImage).show();
            $article.find('.article-title').text(articleObj.title);
            $article.find('.article-description').text(articleObj.description);
            $article.find('.article-url').attr('href',articleObj.url);

            var publishedAtObj = new Date(articleObj.publishedAt);

            var h =  publishedAtObj.getHours(), m = publishedAtObj.getMinutes();
            var published_time = (h > 12) ? (h-12 + ':' + m +' PM') : (h + ':' + m +' AM');



            $article.find('.article-published-at').text(published_time);

            
            
            /*
            
            $article.find('.article-address').text(articleObj.location.address);
            $article.find('.menu-redirection-href').attr("data-app-target",articleObj.menu_url);
            $article.find('.article-locality').text(articleObj.location.locality + ', ' + articleObj.location.city);
            $article.find('.directions').attr("data-app-target", "geo:" + articleObj.location.latitude + "," + articleObj.location.longitude + "?q=" + articleObj.location.latitude + "," + articleObj.location.longitude + "(" + articleObj.name + " " + articleObj.location.locality + ")").attr("target", "_blank");*/
            
            $articles_results.append($article);
        });    
    } else {
        $(page).find('.no-results-found').show();
    }
    
    $(page).delegate('.map-redirection','click',function(){
        var target = $(this).find('.directions').attr('data-app-target');
        window.open(target);
    })

    $(page).delegate('.menu-redirection','click',function(){
        var target = $(this).find('div.menu-redirection-href').attr('data-app-target');
        window.open(target, "_self");
    })
}