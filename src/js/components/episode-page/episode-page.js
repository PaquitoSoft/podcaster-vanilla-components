import { getPodcastDetail } from '../../api/podcaster.js';
import BaseComponent from '../shared/base-component/base-component.js';
import Sidebar from '../shared/sidebar/sidebar.js';

class EpisodePage extends BaseComponent {

	constructor({ podcast, currentEpisode }) {
		super({	podcast, currentEpisode });
	}

	html() {
		return `
			<div class="episode-detail-page page-with-sidebar">
				<div class="sidebar-section">
					${Sidebar(this.state.podcast)}
				</div>

				<div class="content-section">
					<div class="episode-detail section">
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
