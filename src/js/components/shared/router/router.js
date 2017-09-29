const Router = {

	setup({ mountingElement, routingConfig, loadingCallback }) {
		this.rootElement = mountingElement;
		this.routingConfig = routingConfig;
		this.loadingCallback = loadingCallback;

		// Listen to click events in the document
		// If an A tag was clicked, client-side navigate
		// to its link url
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

		// Listen to URL changes (back and forward buttons from the browser)
		window.addEventListener('popstate', () => {
			this.changeUrlHandler(window.location.pathname, true);
		});

		// Fire the first handling event (we don't have server-side rendering)
		this.changeUrlHandler(window.location.pathname);
	},

	getRouteConfigForUrl(url) {
		return this.routingConfig.find(configItem => configItem.pattern.test(url));
	},

	sendLoadingEvent(isLoading) {
		this.loadingCallback(isLoading);
	},

	changeUrlHandler(url, isHistoryEvent) {
		const currentRouteConfig = this.getRouteConfigForUrl(url);

		if (!currentRouteConfig) throw new Error('No route found for URL: ' + url);

		// Extract params from the URL
		// We want the route configuration to return an object with the right attributes
		const urlParams = currentRouteConfig.paramsResolver ?
			currentRouteConfig.paramsResolver(url.match(currentRouteConfig.pattern)) :
			{};

		this.sendLoadingEvent(true);

		// Fire the function that will provide the data needed by the component
		currentRouteConfig.component.dataLoader(urlParams)
			.then(data => {
				this.render(currentRouteConfig.component, data);
				this.sendLoadingEvent(false);
				window.scrollTo(0, 0); // Restore scroll upon navigation

				if (!isHistoryEvent) {
					// Update URL if this is not a happening
					// because of a popstate event, as, in that scenario
					// url has already changed
					window.history.pushState(null, '', url);
				}
			})
			.catch(err => {
				this.sendLoadingEvent(false);
				console.error(`Error trying to navigate: ${err}`);
				console.error(err.stack);
			})
	},

	render(Component, data) {
		const page = new Component(data);
		const routerChild = this.rootElement.children[0];

		// In first render, rootElement has no child
		if (routerChild) {
			this.rootElement.replaceChild(page.render(), routerChild);
		} else {
			this.rootElement.appendChild(page.render());
		}
	}

}

export default Router;
