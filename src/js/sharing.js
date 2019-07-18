import Share from 'ninelines-sharing';

$('[data-social]').on('click', (e) => {
	let $button = $(e.currentTarget);
	let social = $button.data('social');
	let url = location.origin + location.pathname;
	let heroIndex = $button.closest('.hero').data('item');

	if (heroIndex) {
		url += `/share.php?hero=${heroIndex}`;
	}

	Share[social](url);

	$button.trigger('blur');
});
