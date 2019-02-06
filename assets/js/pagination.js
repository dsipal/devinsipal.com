$(document).ready(function(){
	$(window).scroll(function() {
	   if( (($(".post").last().offset().top + $(".post").last().height()) >= $(window).height()) &&
	   		!($('.posts').attr("data-totalpages") == $('.posts').attr("data-page") )
		){
		   loadMorePosts();

	   }
	})
});


function loadMorePosts() {
  var _this = this;
  var $container = $(".posts");
  var nextPage = parseInt($container.attr("data-page")) + 1;
  var totalPages = parseInt($container.attr("data-totalpages"));

  $.get("/page/" + nextPage, function (data) {
    var htmlData = $.parseHTML(data);
    var $posts = $(htmlData).find(".post-container").hide();
    $container.attr("data-page", nextPage).append($posts.fadeIn(1000));

  });
}
