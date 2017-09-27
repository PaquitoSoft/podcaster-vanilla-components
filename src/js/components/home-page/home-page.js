import { getAllPodcasts } from '../../api/podcaster.js';
import BasePage from '../shared/base-page/base-page.js';
import PodcastSummary from './podcast-summary.js';

class HomePage extends BasePage {

    constructor(podcasts = []) {
        super({
			filter: '',
			originalPodcasts: podcasts,
			filteredPodcasts: podcasts.concat([]) // clone
		});
    }

	get events() {
		return {
			'keyup|[name="filter-value"]': this.filterPodcasts
		};
	}

    filterPodcasts(event) {
		if (event.ctrlKey || event.shiftKey || event.keyCode === 16 || event.keyCode === 17) return false;

		const { target } = event;
		const regExp = new RegExp(target.value, 'i');
		const filteredPodcasts = this.state.originalPodcasts
			.filter(podcast => regExp.test(podcast.name + podcast.author));

		this.updateState({
			filter: target.value,
			filteredPodcasts
		});

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
                <div class="row filter">
                    <div class="col-md-5 col-md-offset-7">
                        <span class="badge">${this.state.filteredPodcasts.length}</span>
                        <input id="filter" type="text" name="filter-value" class="form-control input-lg" autoFocus
                            placeholder="Filter podcasts..." value="${this.state.filter}">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="row podcasts">
                            ${this.renderPodcasts(this.state.filteredPodcasts)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

HomePage.dataLoader = () => {
	return getAllPodcasts();
}

export default HomePage;
