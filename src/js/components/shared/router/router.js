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

		window.addEventListener('popstate', () => {
			this.changeUrlHandler(window.location.pathname, true);
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

	changeUrlHandler(url, isHistoryEvent) {
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
				this.sendLoadingEvent(false);
				window.scrollTo(0, 0);

				if (!isHistoryEvent) {
					window.history.pushState(null, '', url);
				}
			})
			.catch(err => {
				this.sendLoadingEvent(false);
				console.error(`Error trying to navigate: ${err}`);
				console.error(err.stack);
			})
	},

	render() {
		if (this.currentRouteConfig) {
			const component = new this.currentRouteConfig.component(this.routeData);
			const routerChildren = this.rootElement.children;
			if (routerChildren.length) {
				this.rootElement.replaceChild(component.render(), this.rootElement.children[0]);
			} else {
				this.rootElement.appendChild(component.render());
			}

		}
	}

}

export default Router;
