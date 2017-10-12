import { getPodcastDetail } from '../../api/podcaster.js';
import BaseComponent from '../shared/base-component/base-component.js';
import Sidebar from '../shared/sidebar/sidebar.js';

class PodcastPage extends BaseComponent {

	constructor(podcast = {}) {
		super({ podcast });
	}

	html() {
		const podcast = this.state.podcast;

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
			<div class="podcast-detail-page page-with-sidebar">
				<section class="sidebar-section">
					${Sidebar(podcast)}
				</section>

				<section class="content-section">
					<div class="section podcast-episodes-count">
						<span>
							Episodes: ${podcast.episodes.length}
						</span>
					</div>

					<div class="section podcast-episodes">
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
				</section>
			</div>
		`;
	}

}


PodcastPage.dataLoader = (params) => {
	return getPodcastDetail(params.podcastId);
}

export default PodcastPage;
