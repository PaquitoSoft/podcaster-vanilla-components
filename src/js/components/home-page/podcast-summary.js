import { getPodcastDetail } from '../../api/podcaster.js';
import BaseComponent from '../shared/base-component/base-component.js';

class PodcastSummary extends BaseComponent {
	constructor(podcast) {
		super({ podcast });
	}

	html() {
		return `
			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 podcast-summary">
				<div class="box">
					<a href="/podcast/${this.state.podcast.id}">
						<div class="box-icon">
							<img src=${this.state.podcast.cover} alt=${this.state.podcast.name}>
						</div>
						<div class="info">
							<h4 class="text-center">${this.state.podcast.name}</h4>
							<p>
								<span class="text-center">
									<span>Author: </span>
									<span>${this.state.podcast.author}</span>
								</span>
							</p>
						</div>
					</a>
				</div>
			</div>
		`;
	}

}

export default PodcastSummary;
