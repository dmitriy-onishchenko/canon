/* global yaCounter52067745 */

import ScrollMagic from 'scrollmagic';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import vars from './../variables';
import helpers from './../helpers';
import {virtualHit} from './analytics';

let controller = new ScrollMagic.Controller();
let navHeight = vars.$nav.height();
let pageHeight = vars.$window.height();
let photoWidth = (vars.$window.width() - 25) / 2;

vars.$blockHeroLeft.css('width', `${photoWidth}px`);

function checkDevices() {
	if (innerWidth > 1024) {
		if (vars.$html.hasClass('is-device-mobile')) {
			vars.$html.removeClass('is-device-mobile').addClass('is-device-desktop');
		}
	}
}

function clearCache() {
	$('.js-has-data-cache').data('cache', null);
}

function cacheData($element, key, value) {
	let cache = $element.data('cache') || {};

	cache[key] = value;
	$element.data('cache', cache);
	$element.addClass('js-has-data-cache');
}

function getFromCache($element, key, fallbackGetter) {
	let cache = $element.data('cache');
	let value;

	if (!cache || !cache[key]) {
		value = fallbackGetter();
		cacheData($element, key, value);
	} else {
		value = cache[key];
	}

	return value;
}

vars.$infoBlock.on('mouseenter', () => {
	if (helpers.isDesktop()) {
		vars.$infoBlock.addClass('is-hover');
	}
});

vars.$infoBlock.on('mouseleave', () => {
	if (helpers.isDesktop()) {
		vars.$infoBlock.removeClass('is-hover');
	}
});

vars.$navItemToMain.on('click', (e) => {
	e.preventDefault();
	$(window).scrollTop(0);
	history.replaceState(null, null, ' ');
});

function animateHero() {
	vars.$blockHeroLeft.each((index, photo) => {
		let $photo = $(photo);
		let $hero = $photo.closest('.hero');
		let $info = $hero.find('.hero__info');

		let photoOffsetTop = $photo.offset().top - navHeight;
		let photoHeight = $photo.height();
		let infoOffsetTop = $info.offset().top;
		let infoHeight = $info.height();
		let infoOffsetBottom = infoOffsetTop + infoHeight - navHeight - photoHeight;

		let isFixed = false;
		let fixedTop = infoOffsetTop - photoOffsetTop;
		let fixedBottom = infoOffsetBottom - photoOffsetTop;

		let setPhotoPosition = () => {
			let scrollTop = vars.$window.scrollTop();

			if (scrollTop >= photoOffsetTop && scrollTop <= infoOffsetBottom && !isFixed) {
				$photo.css({
					position: 'fixed',
					top: fixedTop,
				});

				isFixed = true;
			} else if (scrollTop < photoOffsetTop && isFixed) {
				$photo.css({
					position: 'absolute',
					top: 0,
				});

				isFixed = false;
			} else if (scrollTop > infoOffsetBottom && isFixed) {
				$photo.css({
					position: 'absolute',
					top: fixedBottom,
				});

				isFixed = false;
			}
		};

		setPhotoPosition();

		vars.$window.on('scroll.scroll', () => {
			setPhotoPosition();
		});
	});
}

function animateInfo() {
	let infoContentOffset = vars.$blockInfo.find('.info__content').offset().top;
	let endPoint = infoContentOffset + pageHeight;

	vars.$bgText.css('transition', 'opacity 0.5s, visibility 0.5s');

	vars.$window.on('scroll.scroll', () => {
		let scrollTop = vars.$window.scrollTop();
		let infoBgOffset = vars.$bgText.offset().top - 250;

		if (scrollTop >= infoContentOffset && scrollTop <= endPoint) {
			let step = (scrollTop - infoContentOffset) / pageHeight * 720;

			if (step < 20 || scrollTop < 20) {
				step = 0;
			} else if (step > 700) {
				step = 720;
			}

			TweenMax.to(vars.$info, 0.5, {
				y: -step,
				rotationZ: -0.0001,
			});
		}

		vars.$bgText.toggleClass('is-unvisible', scrollTop >= infoBgOffset);
	});
}

function animateQuote() {
	vars.$heroQuoteItem.each((index, quote) => {
		let $quote = $(quote);
		let $item = $quote.find(vars.$heroQuote);

		$item.addClass(`hero__quote--${index}`);

		let isFixed = false;
		let navHalfHeight = navHeight / 2;
		let quoteOffsetTop = $quote.offset().top;
		let itemHeight = $item.height();
		let fadeTrigger = quoteOffsetTop - pageHeight / 2 + navHeight;
		let fixTrigger = quoteOffsetTop - navHalfHeight;
		let fixTriggerEnd = fixTrigger + pageHeight + 100;
		let topPosition = (pageHeight - itemHeight) / 2 + navHalfHeight;
		let bottomPosition = pageHeight + 100;

		$item
			.addClass('is-unvisible')
			.css('transition', 'opacity 0.7s, visibility 0.7s, transform 0.7s');

		let setQuotePosition = () => {
			let scrollTop = vars.$window.scrollTop();

			if (scrollTop >= fadeTrigger) {
				$item.removeClass('is-unvisible');
			} else {
				$item.addClass('is-unvisible');
			}

			if (scrollTop >= fixTrigger && scrollTop <= fixTriggerEnd && !isFixed) {
				$item
					.addClass('is-fixed')
					.css('top', `${topPosition}px`);

				isFixed = true;
			} else if (scrollTop < fixTrigger && isFixed) {
				$item
					.removeClass('is-fixed')
					.css('top', 0);

				isFixed = false;
			} else if (scrollTop > fixTriggerEnd && isFixed) {
				$item
					.removeClass('is-fixed')
					.css('top', bottomPosition);

				isFixed = false;
			}
		};

		setQuotePosition();

		vars.$window.on('scroll.scroll', () => {
			setQuotePosition();
		});
	});
}

function setImgBlockHeight() {
	vars.$heroImg.each((index, img) => {
		$(img).parent().height(pageHeight * 3 - navHeight);
	});
}

function animateImg() {
	vars.$heroImg.each((index, img) => {
		let $img = $(img);
		let $item = $img.parent();

		$item.addClass(`hero__large--${index}`);

		let isFixed = false;
		let isFixed2 = false;
		let imageHeight = $img.height();
		let itemOffsetTop = $item.offset().top;

		let fixTriggerStart = itemOffsetTop - pageHeight / 2 + pageHeight / 3.75;
		let fixTriggerEnd = fixTriggerStart + pageHeight;
		let topPosition = pageHeight - imageHeight + (pageHeight / 2 - pageHeight / 3.75);
		let bottomPosition = pageHeight;

		let duration2 = pageHeight - navHeight;
		let fixTriggerStart2 = itemOffsetTop - pageHeight / 2 + pageHeight - navHeight / 2 + pageHeight / 2;
		let fixTriggerEnd2 = fixTriggerStart2 + duration2;
		let topPosition2 = (pageHeight - imageHeight) / 2 + navHeight / 2;
		let bottomPosition2 = pageHeight * 2 - navHeight;
		let moveTtrigger = fixTriggerEnd2 + 100;

		let setImagePosition = () => {
			let scrollTop = vars.$window.scrollTop();

			if (scrollTop >= fixTriggerStart && scrollTop <= fixTriggerEnd && !isFixed) {
				$img
					.css({
						position: 'fixed',
						top: `${topPosition}px`,
					});

				isFixed = true;
			} else if (scrollTop < fixTriggerStart && isFixed) {
				$img
					.css({
						position: 'relative',
						top: 0,
					});

				isFixed = false;
			} else if (scrollTop > fixTriggerEnd && isFixed) {
				$img
					.css({
						position: 'relative',
						top: `${bottomPosition}px`,
					});

				isFixed = false;
			}

			if (scrollTop >= fixTriggerStart2 && scrollTop <= fixTriggerEnd2) {
				if (!isFixed2) {
					$img
						.css({
							position: 'fixed',
							top: `${topPosition2}px`,
						});
				}

				let stepOpacity = (scrollTop - fixTriggerStart2) / duration2 * 0.24 + 0.76;
				let stepScale = (scrollTop - fixTriggerStart2) / duration2 * 0.65 + 0.35;

				if (stepOpacity < 0.765) {
					stepOpacity = 0.76;
				} else if (stepOpacity > 0.995) {
					stepOpacity = 1;
				}

				if (stepScale < 0.355) {
					stepScale = 0.35;
				} else if (stepScale > 0.995) {
					stepScale = 1;
				}

				TweenMax.to($img, 0.5, {
					opacity: stepOpacity,
					scale: stepScale,
					rotationZ: -0.0001,
				});

				isFixed2 = true;
			} else if (scrollTop < fixTriggerStart2 && isFixed2) {
				$img
					.css({
						position: 'relative',
						top: `${bottomPosition}px`,
					});

				TweenMax.to($img, 0.5, {
					opacity: 0.76,
					scale: 0.35,
					rotationZ: 0,
				});

				isFixed2 = false;
			} else if (scrollTop > fixTriggerEnd2 && isFixed2) {
				$img
					.css({
						position: 'relative',
						top: `${bottomPosition2}px`,
					});

				TweenMax.to($img, 0.5, {
					opacity: 1,
					scale: 1,
					rotationZ: 0,
				});

				isFixed2 = false;
			}

			if (scrollTop > moveTtrigger) {
				TweenMax.to($img, 0.5, {
					y: -(scrollTop - moveTtrigger) / 4,
					rotationZ: -0.0001,
				});
			} else if (scrollTop <= moveTtrigger) {
				TweenMax.to($img, 0.5, {
					y: 0,
					rotationZ: 0,
					clearProps: 'y',
				});
			}
		};

		setImagePosition();

		vars.$window.on('scroll.scroll', () => {
			setImagePosition();
		});
	});
}

function animateShare() {
	let tween = TweenMax.to(vars.$share, 0.5, {
		autoAlpha: 0,
		ease: Sine.easeInOut,
	});

	new ScrollMagic.Scene({
		triggerElement: '.banner.for-desktop',
		offset: -(pageHeight - navHeight),
	})
		.setTween(tween)
		.addTo(controller);
}

checkDevices();

let isScrolled = false;
let firstVHIsSend = false;

function scrollEvents() {
	let scrollY = pageYOffset;
	let clientWidth = document.documentElement.clientWidth;
	let windowHeight = vars.$window.height();
	let scrollHeight = vars.$document.height();
	let scrollPosition = windowHeight + scrollY;
	let hero1BgPosition = -(scrollY / 7);
	let hero1Top = getFromCache(vars.$blockHero1, 'offset.top', () => vars.$blockHero1.offset().top);
	let theme = 'dark';
	let progress = null;

	TweenMax.to(vars.$hero1Bg, 0.5, {
		y: hero1BgPosition,
		rotationZ: -0.0001,
	});

	vars.$dataScrollSpeed.each((i, elem) => {
		let $elem = $(elem);
		let speed = parseInt($elem.attr('data-scroll-speed'), 10);
		let yVh = -(scrollY / speed) / 809 * 100;
		let yPx = yVh / 100 * innerHeight;

		TweenMax.to($elem, 0.5, {
			y: yPx,
			rotationZ: -0.0001,
		});
	});

	vars.$header.toggleClass('is-invisible', scrollY > 60);

	vars.$nav.toggleClass('is-show', scrollY > hero1Top - navHeight);

	vars.$blockHero.each((i, elem) => {
		let $elem = $(elem);
		let $next = $elem.next();
		let id = $elem.attr('data-item');
		let elemTop = getFromCache($elem, 'offset.top', () => $elem.offset().top);
		let nextTop = getFromCache($next, 'offset.top', () => $next.offset().top);
		let scrolledHero = Math.min((scrollY - elemTop) / (nextTop - elemTop) * 100, 100);
		let $navItem = vars.$navItem.filter(`[data-item="${id}"]`);
		let $navText = $navItem.find(vars.$navText);
		let $progressItem = $navItem.find(vars.$navProgress);

		$progressItem.css('width', `${scrolledHero}%`);

		if (scrollY > elemTop - navHeight) {
			let itemPos = getFromCache($navText, 'offset.left', () => $navText.offset().left);

			progress = itemPos / clientWidth * 100;
		}

		if (scrollY > elemTop - windowHeight / 2) {
			if ($elem.hasClass('hero--dark')) {
				theme = 'white';
			} else {
				theme = 'dark';
			}
		}
	});

	if (theme === 'white') {
		vars.$share.attr('data-theme', 'white');
	} else {
		vars.$share.removeAttr('data-theme');
	}

	if (!vars.$nav.hasClass('is-show')) {
		vars.$navItem.removeClass('is-active');
	}

	if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
		progress = 100;
	}

	if (progress !== null) {
		vars.$progress.css('width', `${progress}%`);
	}

	vars.$navItemScroll.each((i, elem) => {
		let $currLink = $(elem);
		let hash = $currLink.attr('href');
		let $refElement = $currLink.data('$refElement');

		if (!$refElement) {
			$refElement = $(hash);
			$currLink.data('$refElement', $refElement);
		}

		let refElementTop = getFromCache($refElement, 'position.top', () => $refElement.position().top);
		let name = $refElement.find(vars.$heroNameTitle).text();

		if (scrollY + navHeight > refElementTop && scrollY + navHeight < refElementTop + $refElement.height()) {
			vars.$navItemScroll.removeClass('is-active');
			$currLink.addClass('is-active');

			if (!$refElement.attr('data-send') && isScrolled) {
				ga('send', 'event', 'main page', 'hero see', name, {nonInteraction: true});
				$refElement.attr('data-send', 'true');
			}

			if (!$refElement.attr('data-send-vh') && isScrolled) {
				if (location.hash === hash && !firstVHIsSend) {
					return;
				}

				virtualHit(location.pathname + hash);
				$refElement.attr('data-send-vh', 'true');

				firstVHIsSend = true;
			}
		} else {
			$currLink.removeClass('active');
			$refElement.removeAttr('data-send');
			$refElement.removeAttr('data-send-vh');
		}
	});
}

function initAnchors() {
	if (location.hash) {
		let $block = $(location.hash);

		if (!$block.length) {
			return;
		}

		let dataBlock = $block.data('item');
		let position = dataBlock === 1 ? $block.offset().top + 1 : $block.offset().top - navHeight + 5;

		TweenMax.to($('html, body'), 0.7, {
			scrollTop: position,
			onComplete() {
				setTimeout(() => {
					isScrolled = true;

					scrollEvents();
				}, 1000);
			},
		});
	}

	vars.$navPage.add(vars.$navItem).on('click', (e) => {
		e.preventDefault();

		let $block = $($(e.currentTarget).attr('href'));

		if (!$block.length) {
			$('html, body').animate({
				scrollTop: 0,
			}, 700);

			return;
		}

		let dataBlock = $block.data('item');
		let position = dataBlock === 1 ? $block.offset().top + 1 : $block.offset().top - navHeight + 1;

		$('html, body').animate({
			scrollTop: position,
		}, 700);
	});
}

if (!vars.$html.hasClass('is-device-mobile')) {
	$(window).on('load', () => {
		animateHero();
		animateImg();
		animateQuote();
		initAnchors();

		vars.$document.on('scroll', scrollEvents);
	});

	setImgBlockHeight();
	animateInfo();
	animateShare();

	let resizeTimeout = 0;

	$(window).on('resize', () => {
		if (resizeTimeout) {
			clearTimeout(resizeTimeout);
		}

		resizeTimeout = setTimeout(() => {
			vars.$window.off('.scroll');

			navHeight = vars.$nav.height();
			pageHeight = vars.$window.height();
			photoWidth = vars.$window.width() / 2;

			vars.$blockHeroLeft.css('width', `${photoWidth}px`);

			setImgBlockHeight();
			animateInfo();
			animateHero();
			animateImg();
			animateQuote();

			clearCache();
		}, 500);
	});
}

if (vars.$html.hasClass('is-device-mobile')) {
	vars.$blockHeroLeft.removeAttr('style');
}
