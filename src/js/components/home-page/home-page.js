import { getAllPodcasts } from '../../api/podcaster.js';
import PodcastSummary from './podcast-summary.js';

class HomePage {

    constructor(podcasts = []) {
        this.originalPodcasts = podcasts;
        this.filteredPodcasts = podcasts.concat([]); // clone
    }

    filterPodcasts(event) {
		event.preventDefault();
		const regExp = new RegExp(event.target.value, 'i');
        this.filteredPodcasts = podcasts.filter(podcast => regExp.test(podcast.name + podcast.author));
        this.render();
    }

    render() {
		const podcasts = this.filteredPodcasts
			.map(podcast => (new PodcastSummary(podcast)).render())
			.join('');

        return `
            <div class="podcasts-grid">
                <div class="row filter">
                    <div class="col-md-5 col-md-offset-7">
                        <span class="badge">${this.filteredPodcasts.length}</span>
                        <input id="filter" type="text" class="form-control input-lg" autoFocus
                            placeholder="Filter podcasts..." value="">
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
