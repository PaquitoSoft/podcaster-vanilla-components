import { getPodcastDetail } from '../../api/podcaster.js';
import Sidebar from '../shared/sidebar/sidebar.js';

class EpisodePage {

	constructor({ podcast, currentEpisode }) {
		this.podcast = podcast;
		this.currentEpisode = currentEpisode;
	}

	render() {
		return `
			<div>
				${(new Sidebar(this.podcast)).render()}

				<div class="col-md-8 col-md-offset-1 section">
					<div class="episode-detail">
						<div class="title">${this.currentEpisode.title}</div>
						<div class="subtitle">${this.currentEpisode.description}</div>
						<hr/>
						<div class="player">
							<audio src=${this.currentEpisode.mediaUrl} controls></audio>
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
