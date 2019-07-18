/* global yaCounter52067745 */

import scrollDepth from 'scroll-depth';
import router from '../router/router';

function start15SecTimeout() {
	clearTimeout($(window).data('timeout15Sec'));

	$(window).data('timeout15Sec', setTimeout(() => {
		ga('rbcspec.send', 'event', 'page', 'spent_on_page_15_sec');
		ga('send', 'event', 'page', 'spent_on_page_15_sec');
	}, 15000));
}

export function virtualHit(path) {
	if (window.ga) {
		ga('set', 'page', path);
		ga('send', 'pageview', path);
		ga('rbcspec.set', 'page', path);
		ga('rbcspec.send', 'pageview', path);
	}

	if (window.yaCounter52067745) {
		yaCounter52067745.hit(path);
	}
}

function clearText(text) {
	return text.toString().trim().replace(/\s+/g, ' ');
}

scrollDepth({
	userTiming: false,
	pixelDepth: false,
	gtmOverride: true,
	eventHandler(data) {
		ga('send', 'event', data.eventCategory, data.eventAction, data.eventLabel, {nonInteraction: true});
		ga('rbcspec.send', 'event', data.eventCategory, data.eventAction, data.eventLabel, {nonInteraction: true});
	},
});

router.on('enter', (prevState, currentState) => {
	start15SecTimeout();

	if (!currentState.route) {
		return;
	}

	if (prevState.route) {
		virtualHit(location.pathname + location.hash);
		scrollDepth.reset();
	}
});

$('.header__project-logo').on('click', () => {
	ga('send', 'event', 'client link', 'logo header');
	ga('rbcspec.send', 'event', 'client link', 'click');
});

$('.logo-rbc').on('click', () => {
	ga('send', 'event', 'nav', 'rbc logo');
});

$('.nav__item').on('click', (e) => {
	let name = $(e.currentTarget).find('.nav__text').text();

	ga('send', 'event', 'nav', 'item click', name);
});

$('.mobile-nav__item').on('click', (e) => {
	let name = $(e.currentTarget).text();

	ga('send', 'event', 'nav', 'item click', name);
});

$('.banner__link-info').on('click', () => {
	ga('send', 'event', 'client link', 'bottom product block');
	ga('rbcspec.send', 'event', 'client link', 'click');
});

$('.info__content-hero').on('click', (e) => {
	let name = $(e.currentTarget).find('.info__name-hero').text();

	ga('send', 'event', 'main page', 'top article click', name);
});

$('.share__item-social').on('click', (e) => {
	let socialName = $(e.currentTarget).attr('data-social');

	ga('send', 'event', 'share', 'main left share', socialName);
});

$('.social__item').on('click', (e) => {
	let socialName = $(e.currentTarget).attr('data-social');

	ga('send', 'event', 'share', 'main bottom share', socialName);
});

$('.hero-share__button').on('click', (e) => {
	let socialName = $(e.currentTarget).data('social');

	ga('send', 'event', 'share', 'hero share', socialName);
});

$('.hero__text-info').on('click', (e) => {
	let title = $(e.currentTarget).closest('.hero').find('.hero__name-title').text();
	let link = clearText($(e.currentTarget).text());
	let name = `${title} || ${link}`;

	ga('send', 'event', 'client link', 'hero photo link', name);
	ga('rbcspec.send', 'event', 'client link', 'click');
});

$('.hero__icon-info').on('click', (e) => {
	let title = $(e.currentTarget).closest('.hero').find('.hero__name-title').text();
	let $link = $(e.currentTarget).next().text();
	let linkText = clearText($link);
	let name = `${title} || ${linkText}`;

	ga('send', 'event', 'client link', 'hero photo link', name);
	ga('rbcspec.send', 'event', 'client link', 'click');
});

$('.hero__product-link').on('click', (e) => {
	let title = $(e.currentTarget).closest('.hero').find('.hero__name-title').text();
	let product = clearText($(e.currentTarget).closest('.hero').find('.hero__bottom-text.for-desktop b').text());
	let name = `${title} || ${product}`;

	ga('send', 'event', 'client link', 'hero know more button', name);
	ga('rbcspec.send', 'event', 'client link', 'click');
});
