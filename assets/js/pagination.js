var categories = ['code', 'graphics', 'video'];

$(document).ready(function() {
    var getSwitch = false;
    var cat = getSearchParams('cat');
    var ele = document.getElementById(cat);

    if (ele != null && !getSwitch) {
        switchCat(ele);
        getSwitch = true;
    }

    $(window).scroll(function() {
        if ($('.feed').attr('data-page') < $('.feed').attr('data-totalPages')
		&& ($('body').height() <= $(window).height() ||
		($(document).height() - $(window).height() - $(window).scrollTop()) < ($('.feed-item').height() * .75))
	) {
            loadMorePosts();
			console.log('more posts.');
        }
    })
});

function getSearchParams(k) {
    var p = {};
    location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(s, k, v) {
        p[k] = v
    })
    return k ? p[k] : p;
}

function switchCat(element) {
    var category = "/" + element.id + "/";

    if ($.inArray(category, categories)) {
        var container = $('.feed');
        var ele = $(element);

        if (ele.hasClass('active')) {

            $.get("/page/", function(data) {
                container.replaceWith(data);
            });

            ele.removeClass('active');


        } else {
            $.get(category, function(data) {
                var $new = $.parseHTML(data);
                container.replaceWith($new);
            });

            $('.active').removeClass('active');
            ele.addClass('active');
        }
    } else {
        console.log('fuck off.');
    }
}

function loadMorePosts() {

    var container = $('.feed');
    var nextPage = parseInt(container.attr("data-page")) + 1;
    var totalPages = parseInt(container.attr("data-totalPages"));
    var url = container.attr("data-url");

    container.attr("data-page", nextPage);
    $.get(url + nextPage, function(data) {
        var htmlData = $.parseHTML(data);
        var $new = $(htmlData).find(".feed-row").hide();
        container.append($new.fadeIn(1000));
    });
}
