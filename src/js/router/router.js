import {Router} from 'ninelines-router';
import {showMain, showArticle} from './animation';
import {pageTransition} from './transition';

let router = new Router({
	onNotFound() {
		document.location = '/';

		return Promise.reject();
	},
});

router.addRoute({
	path: '/',
	name: 'main',
	onEnter(prevState) {
		if (prevState.route === null) {
			return showMain();
		}

		return pageTransition(showMain);
	},
});

router.addRoute({
	path: '/article/:id',
	name: 'article',
	onEnter(prevState, currentState) {
		let id = currentState.params.id;

		if (prevState.route === null) {
			return showArticle(id);
		}

		return pageTransition(showArticle, id);
	},
});

router.start();

export default router;
