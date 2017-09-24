import { routingConfig } from '../../../config/routing.js';

const Router = {

	setup(mountingElement) {
		this.rootElement = mountingElement;
		this.currentRouteConfig;
		this.routeData;

		document.addEventListener('click', event => {
			let element = event.target;

			while (element && element.tagName !== 'A') {
				element = element.parentNode;
			}

			if (element) {
				event.preventDefault();
				this.changeUrlHandler(element.pathname);
			}
		});

		this.changeUrlHandler(window.location.pathname);
	},

	getRouteConfigForUrl(url) {
		return routingConfig.find(configItem => configItem.pattern.test(url));
	},

	sendLoadingEvent(isLoading) {
		const event = new CustomEvent('podcaster::loading', {
			detail: { isLoading }
		});
		document.dispatchEvent(event);
	},

	changeUrlHandler(url) {
		this.currentRouteConfig = this.getRouteConfigForUrl(url);

		if (!this.currentRouteConfig) throw new Error('No route found for URL: ' + url);

		const urlParams = this.currentRouteConfig.paramsResolver ?
			this.currentRouteConfig.paramsResolver(url.match(this.currentRouteConfig.pattern)) :
			{};

		this.sendLoadingEvent(true);

		this.currentRouteConfig.component.dataLoader(urlParams)
			.then(data => {
				this.routeData = data;
				this.render();
				window.history.pushState(null, '', url);
				this.sendLoadingEvent(false);
				window.scrollTo(0, 0);
			})
			.catch(err => {
				this.sendLoadingEvent(false);
				console.error(`Error trying to navigate: ${err}`);
				console.error(err.stack);
			})
	},

	render() {
		let html = '';

		if (this.currentRouteConfig) {
			const component = new this.currentRouteConfig.component(this.routeData);
			html = `<div>${component.render()}</div>`;
		}

		this.rootElement.innerHTML = html;
	}

}

export default Router;
