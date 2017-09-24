import { getPodcastDetail } from '../../api/podcaster.js';
import BaseComponent from '../shared/base-component/base-component.js';
import Sidebar from '../shared/sidebar/sidebar.js';

class EpisodePage extends BaseComponent {

	constructor({ podcast, currentEpisode }) {
		super({	podcast, currentEpisode });
	}

	html() {
		return `
			<div>
				${(new Sidebar(this.state.podcast)).render()}

				<div class="col-md-8 col-md-offset-1 section">
					<div class="episode-detail">
						<div class="title">${this.state.currentEpisode.title}</div>
						<div class="subtitle">${this.state.currentEpisode.description}</div>
						<hr/>
						<div class="player">
							<audio src=${this.state.currentEpisode.mediaUrl} controls></audio>
						</div>
					</div>
				</div>
			</div>
		`;
	}

}

EpisodePage.dataLoader = (params) => {
	return getPodcastDetail(params.podcastId)
		.then(podcast => {
			return {
				podcast,
				currentEpisode: podcast.episodes.find(episode => episode.id == params.episodeId)
			};
		});
};

export default EpisodePage;
