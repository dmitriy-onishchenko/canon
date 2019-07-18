import vars from '../variables';
import {initSlider} from '../components/mobile';

function closeMenu() {
	if (vars.$body.hasClass('is-open-nav')) {
		vars.$body.removeClass('is-open-nav');
	}
}

export function showMain() {
	return new Promise((resolve) => {
		let timeline = new TimelineMax({
			onStart() {
				vars.$page.removeAttr('data-mobile');
				vars.$blockInfo.removeAttr('data-mobile');
				closeMenu();
				initSlider();
			},
			onComplete() {
				resolve();
			},
		});

		if (vars.$html.hasClass('is-device-mobile')) {
			timeline
				.from(vars.$page, 0.4, {
					autoAlpha: 0,
					clearProps: 'all',
				});
		}
	});
}

export function showArticle(id) {
	return new Promise((resolve) => {
		let $article = $(`.hero[data-item="${id}"]`);
		let $nav = $(`.mobile-nav__item[data-item="${id}"]`);
		let name = $nav.text();

		new TimelineMax({
			onStart() {
				window.scrollTo(0, 0);
				vars.$page.removeAttr('data-mobile');
				vars.$banner.removeAttr('data-mobile');
				vars.$otherHeroes.removeAttr('data-mobile');
				$article.removeAttr('data-mobile');
				$nav.addClass('is-current');
				vars.$body.attr('data-page', 'article');
				closeMenu();
				initSlider();
				ga('send', 'event', 'main page', 'hero see', name, {nonInteraction: true});
			},
			onComplete() {
				resolve();
			},
		})
			.from(vars.$page, 0.4, {
				autoAlpha: 0,
				clearProps: 'all',
			});
	});
}
