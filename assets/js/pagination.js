
$(window).scroll(function() {
   if( ($(window).scrollTop() + $(window).height() == $(document).height()) &&
   		!($('.posts').attr("data-totalpages") == $('.posts').attr("data-page") )
	){
	   loadMorePosts();
   }
});

function loadMorePosts() {
  var _this = this;
  var $container = $(".posts");
  var nextPage = parseInt($container.attr("data-page")) + 1;
  var totalPages = parseInt($container.attr("data-totalpages"));
  $(this).addClass("loading");

  $.get("/page/" + nextPage, function (data) {
    var htmlData = $.parseHTML(data);
    var $posts = $(htmlData).find(".post-container");
    $container.attr("data-page", nextPage).append($posts);
    if ($container.attr("data-totalPages") == nextPage) {
      $(".loadMore").remove();
    }
    $(_this).removeClass("loading");
  });
}
