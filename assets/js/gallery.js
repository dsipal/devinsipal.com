$(document).ready(function() {
	handleButtonDisplay();
	$('.gallery-button').click(function(){
		const id = $(this).attr('id');
		switchImages(id);
		handleButtonDisplay();
	})

	function switchImages(id){
		var info,images,image,next;
		info = getInfo();
		images = info[0];
		image = info[1];

		if(id=='next'){
			next = image+1;
		}else{
			next = image-1;
		}

		if(next > 0 && images >= next){
			$('#img-'+image).hide();
			$('#img-'+next).show();
			$('.gallery').attr('data-image', next);
		}
	}

	function handleButtonDisplay(){
		var info,images,image;
		info = getInfo();
		images = info[0];
		image = info[1];

		if(images == image){
			$('#next').addClass('inactive');
		}
		else if(image == 1){
			$('#prev').addClass('inactive');
		}
		else{
			$('.gallery-button').removeClass('inactive');
		}
	}

	function getInfo(){
		var images = parseInt($('.gallery').attr('data-images'));
		var image = parseInt($('.gallery').attr('data-image'));
		return [images,image];
	}
});
