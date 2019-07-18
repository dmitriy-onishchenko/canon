import vars from './../variables';
import Swiper from 'swiper/dist/js/swiper.js';

export function initSlider() {
	if (!vars.$html.hasClass('is-device-desktop')) {
		vars.$pageBlock.each((i, elem) => {
			if (!$(elem).attr('data-mobile')) {
				let $slider = $(elem).find('.swiper-container');

				if ($slider) {
					let $prevArrow = $slider.find('.slider-button--prev');
					let $nextArrow = $slider.find('.slider-button--next');

					if (!$slider.hasClass('slider-init')) {
						let swiper = new Swiper($slider, {
							slidesPerView: 1.65,
							loopAdditionalSlides: 1,
							spaceBetween: 50,
							roundLengths: true,
							centeredSlides: true,
							loop: true,
							navigation: {
								nextEl: $nextArrow,
								prevEl: $prevArrow,
							},
						});

						$slider.addClass('slider-init');
					}
				}
			}
		});
	}
}

vars.$burger.on('click', () => {
	vars.$body.addClass('is-open-nav');
});

vars.$navClose.on('click', () => {
	vars.$body.removeClass('is-open-nav');
});
