let ids = 0;

class BasePage {

	constructor(data = {}) {
		this.componentId = ids++;
		this.state = data;
		this.$el = document.createElement('div');
		this.$el.setAttribute('data-componentid', this.componentId);

		Object.keys(this.events || {}).forEach(key => {
			const [eventName, selector] = key.split('|');

			this.$el.addEventListener(eventName, (function(selector, event) {
				if (event.target.matches(selector)) {
					this.events[key].call(this, event);
				}
			}).bind(this, selector));
		});
	}

	updateState(newState) {
		this.state = Object.assign({}, this.state, newState);
		this.render();
	}

	render() {
		this.$el.innerHTML = this.html();
		return this.$el;
	}

}

export default BasePage;