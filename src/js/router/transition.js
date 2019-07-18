import vars from '../variables';

export function pageTransition(animation, id) {
	return new Promise((resolve) => {
		let timeline = new TimelineMax({
			onComplete() {
				vars.$pageBlock.attr('data-mobile', 'hidden');
				vars.$navMobile.removeClass('is-current');
				vars.$body.removeAttr('data-page');

				TweenMax.set([vars.$page], {
					clearProps: 'all',
				});

				animation(id);
				resolve();
			},
		});

		if (vars.$html.hasClass('is-device-mobile')) {
			timeline
				.to(vars.$page, 0.5, {
					autoAlpha: 0,
				});
		}
	});
}
