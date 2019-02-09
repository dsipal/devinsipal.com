$(document).ready(function() {
	console.log($('feed-row').attr('data-page'));
    $(window).scroll(function() {
        if ($('body').height() <= $(window).height() ||
            ($(document).height() - $(window).height() - $(window).scrollTop()) < 200 &&
			$('.feed').attr('data-page') < $('.feed').attr('data-totalPages')
		) {
            loadMorePosts()
        }
    })
});


function loadMorePosts() {

	var container = $('.feed');
    var nextPage = parseInt(container.attr("data-page")) + 1;
    var totalPages = parseInt(container.attr("data-totalPages"));

    container.attr("data-page", nextPage);
    $.get("/page/" + nextPage, function(data) {
        var htmlData = $.parseHTML(data);
        var $new = $(htmlData).find(".feed-row").hide();
        container.append($new.fadeIn(1000));
    });
}
