let ids = 0;

const processedEventsComponents = [];

class BaseComponent {

	constructor(data = {}) {
		this.componentId = ids++;
		this.state = data;

		if (processedEventsComponents.indexOf(this.constructor.name) === -1) {
			Object.keys(this.events || {}).forEach(key => {
				const [eventName, selector] = key.split('|');

				document.addEventListener(eventName, (function(selector, event) {
					if (event.target.matches(selector)) {
						this.events[key].call(this, event);
					}
				}).bind(this, selector));
			});

			processedEventsComponents.push(this.constructor.name);
		}
	}

	updateState(newState) {
		this.state = Object.assign({}, this.state, newState);

		document
			.querySelector(`[data-componentid="${this.componentId}"]`)
			.innerHTML = this.render();
	}

	render() {
		return `
			<div data-componentid="${this.componentId}">${this.html()}</div>
		`;
	}

}

export default BaseComponent;
