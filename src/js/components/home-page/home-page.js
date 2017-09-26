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
		console.info(`We need to filter podcasts with: ${event.target.value}`);
		const regExp = new RegExp(event.target.value, 'i');
		this.state.filteredPodcasts = this.state.originalPodcasts
			.filter(podcast => regExp.test(podcast.name + podcast.author));

		this.$el.querySelector('.badge').innerHTML = this.state.filteredPodcasts.length;
        this.$el.querySelector('.row.podcasts').innerHTML = this.renderPodcasts(this.state.filteredPodcasts);
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
