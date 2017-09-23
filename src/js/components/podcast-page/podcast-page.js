import { getPodcastDetail } from '../../api/podcaster.js';
import Sidebar from '../shared/sidebar/sidebar.js';

class PodcastPage {

	constructor(podcast = {}) {
		this.podcast = podcast;
	}

	render() {
		const podcast = this.podcast;

		const episodes = podcast.episodes.map(episode => {
			return `
				<tr class="podcast-episode-summary">
					<td>
						<a href="${`/podcast/${podcast.id}/episode/${episode.id}`}">${episode.title}</a>
					</td>
					<td>${episode.date}</td>
					<td class="duration">${episode.duration}</td>
				</tr>
			`;
		}).join('');

		return `
			<div>
				${(new Sidebar(podcast)).render()}

				<div class="col-md-8 col-md-offset-1 section podcast-episodes-count">
					<span>
						Episodes: ${podcast.episodes.length}
					</span>
				</div>
				<div class="col-md-8 col-md-offset-1 section">
					<div class="podcast-episodes">
						<table class="table table-hover table-striped">
							<thead>
								<tr>
									<th>Title</th>
									<th>Date</th>
									<th>Duration</th>
								</tr>
							</thead>
							<tbody>
								${episodes}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		`;
	}

}


PodcastPage.dataLoader = (params) => {
	return getPodcastDetail(params.podcastId);
}

export default PodcastPage;
