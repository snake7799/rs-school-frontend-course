$(document).ready(function() {
    $('.carousel-control').hide();
	$('.carousel-indicators').hide();
	$('.carousel').hover(
		function() {
			$('.carousel-control').stop().fadeIn(700);
			$('.carousel-indicators').stop().fadeIn(700);
		},
		function() {
			$('.carousel-control').stop().fadeOut(300);
			$('.carousel-indicators').stop().fadeOut(300);
		}
	);
});
