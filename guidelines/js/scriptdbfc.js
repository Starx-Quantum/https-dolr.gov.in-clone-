jQuery(document).ready(function(){
	jQuery("a").attr("role","link");
	jQuery("input:submit").attr("role","Submit");
	jQuery(".gtranslate select").attr("id","gtranslate");
	jQuery(".gtranslate").addClass("skiptranslate")
	jQuery(".gtranslate").append('<label for="gtranslate" class="notdisplay">Google Translate</label>');
	jQuery("#prevLink").text('Go to Previous');
	jQuery("#nextLink").text('Go to next');
	jQuery("#loadingLink").text('Link Loading');
	jQuery("#framePrevLink").text('Frame Previous Link');
	jQuery("#frameNextLink").text('Frame Next Link');
	jQuery("#bottomNavClose").text('Bottom Navigation Close');
	jQuery("#bottomNavZoom").text('Bottom Navigation Zoom');
	jQuery("#bottomNavZoomOut").text('Bottom Navigation Zoom Out');
	jQuery("#lightshowPause").text('Pause Light Show');
	jQuery("#lightshowPlay").text('Play Light Show');
});







