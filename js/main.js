jQuery(document).ready(function($){
	var slidesWrapper = $('.cd-hero-slider');

	//check if a .cd-hero-slider exists in the DOM 
	if ( slidesWrapper.length > 0 ) {
		var primaryNav = $('.cd-primary-nav'),
			sliderNav = $('.hero-nav'),
			navigationMarker = $('.cd-marker'),
			slidesNumber = slidesWrapper.children('li').length,
			visibleSlidePosition = 0,
			autoPlayId,
			autoPlayDelay = 5000;


		//autoplay slider
		setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);

		//on mobile - open/close primary navigation clicking/tapping the menu icon
		primaryNav.on('click', function(event){
			if($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');
		});
		


		//change visible slide
		sliderNav.on('click', 'img', function(event){
			event.preventDefault();
			
			var selectedItem = $(this);
			
			activePosition = slidesWrapper.find('li.selected').index();
				
			if($(selectedItem).hasClass('next-arrow')) {
				if( visibleSlidePosition < slidesNumber - 1) {
					nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, visibleSlidePosition + 1);
					visibleSlidePosition +=1;
				} else {
					prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, 0);
					visibleSlidePosition = 0;
				}
			} else {
				if( visibleSlidePosition != 0) {
					prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, visibleSlidePosition - 1);	
					visibleSlidePosition -=1;
				} else {
					prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, slidesNumber - 1);
					visibleSlidePosition = slidesNumber - 1;
				}
					
			}

			//reset autoplay
			setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);
			
		});
	}

	function nextSlide(visibleSlide, container, pagination, n){
		visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			visibleSlide.removeClass('is-moving');
		});

		container.children('li').eq(n).addClass('selected from-right').prevAll().addClass('move-left');
	}

	function prevSlide(visibleSlide, container, pagination, n){
		visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			visibleSlide.removeClass('is-moving');
		});

		container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left');
	}

	function setAutoplay(wrapper, length, delay) {
		if(wrapper.hasClass('autoplay')) {
			clearInterval(autoPlayId);
			autoPlayId = window.setInterval(function(){autoplaySlider(length)}, delay);
		}
	}

	function autoplaySlider(length) {
		if( visibleSlidePosition < length - 1) {
			nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, visibleSlidePosition + 1);
			visibleSlidePosition +=1;
		} else {
			prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, 0);
			visibleSlidePosition = 0;
		}
	
	}
});