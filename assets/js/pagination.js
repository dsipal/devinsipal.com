$(document).ready(function(){
	$(window).scroll(function() {
	   if(
		   ( $(document).height() - $(window).height() - $(window).scrollTop()) < 70 &&
	   		!($('.posts').attr("data-totalpages") == $('.posts').attr("data-page") )
		){
		   loadMorePosts()
	   }
	})
});


function loadMorePosts() {
  var _this = this;
  var $container = $(".posts");
  var nextPage = parseInt($container.attr("data-page")) + 1;
  var totalPages = parseInt($container.attr("data-totalpages"));

  $container.attr("data-page", nextPage);
  $.get("/page/" + nextPage, function (data) {
    var htmlData = $.parseHTML(data);
    var $posts = $(htmlData).find(".post-container").hide();
    $container.append($posts.fadeIn(1000));
  });
}
