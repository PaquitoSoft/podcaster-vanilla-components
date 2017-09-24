import { getAllPodcasts } from '../../api/podcaster.js';
import BaseComponent from '../shared/base-component/base-component.js';
import PodcastSummary from './podcast-summary.js';

class HomePage extends BaseComponent {

    constructor(podcasts = []) {
        super({
			filter: '',
			originalPodcasts: podcasts,
			filteredPodcasts: podcasts.concat([]) // clone
		});
    }

	get events() {
		return {
			'change|[name="filter-value"]': this.filterPodcasts
		};
	}

    filterPodcasts(event) {
		console.info(`We need to filter podcasts with: ${event.target.value}`);
		// event.preventDefault();
		const regExp = new RegExp(event.target.value, 'i');
		const filteredPodcasts = this.state.originalPodcasts
			.filter(podcast => regExp.test(podcast.name + podcast.author));
		this.updateState({
			filter: event.target.value,
			filteredPodcasts
		});
    }

    html() {
		const podcasts = this.state.filteredPodcasts
			.map(podcast => (new PodcastSummary(podcast)).render())
			.join('');

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
                            ${podcasts}
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
