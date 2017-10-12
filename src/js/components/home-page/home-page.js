import { getAllPodcasts } from '../../api/podcaster.js';
import BaseComponent from '../shared/base-component/base-component.js';
import PodcastSummary from './podcast-summary.js';

class HomePage extends BaseComponent {

    constructor(podcasts = []) {
		// Call parent class with instance state
        super({
			filter: '',
			originalPodcasts: podcasts,
			filteredPodcasts: podcasts.concat([]) // clone
		});
    }

	// Getter used from base component to configure DOM listeners
	// in the rendered HTMLElement (by event delegation)
	get events() {
		return {
			'keyup|[name="filter-value"]': this.filterPodcasts
		};
	}

    filterPodcasts(event) {
		// Fail fast if key is Control or Shift
		if (event.ctrlKey || event.shiftKey || event.keyCode === 16 || event.keyCode === 17) return false;

		const { target } = event;
		const regExp = new RegExp(target.value, 'i');
		const filteredPodcasts = this.state.originalPodcasts
			.filter(podcast => regExp.test(podcast.name + podcast.author));

		// Update instance state with filter value and filtered podcasts list
		// We need to keep the filter value in the state because we re-render
		// the whole view
		this.updateState({
			filter: target.value,
			filteredPodcasts
		});

		// Because we re-render the whole view, we need to move the cursor
		// to the end of the filter input (whole page page is updated while
		// typing the filter value)
		const input = this.$el.querySelector('[name="filter-value"]');
		input.focus();
		input.setSelectionRange(target.value.length, target.value.length);
    }

	renderPodcasts(podcasts) {
		return podcasts
			.map(PodcastSummary)
			.join('');
	}

    html() {
        return `
            <div class="podcasts-grid">
                <div class="filter">
					<span class="badge">${this.state.filteredPodcasts.length}</span>
					<input type="text" name="filter-value" autoFocus
						placeholder="Filter podcasts..." value="${this.state.filter}">
                </div>
				<div class="podcasts-list">
					${this.renderPodcasts(this.state.filteredPodcasts)}
				</div>
            </div>
        `;
    }
}

// Define the function that loads required data
// This function is used by the Router to preload data before
// navigating to this view
HomePage.dataLoader = () => {
	return getAllPodcasts();
}

export default HomePage;
