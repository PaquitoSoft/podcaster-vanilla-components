import { getPodcastDetail } from '../../api/podcaster.js';

class PodcastSummary {
	constructor(podcast) {
		this.podcast = podcast;
	}

	render() {
		return `
			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 podcast-summary">
				<div class="box">
					<a href="/podcast/${this.podcast.id}">
						<div class="box-icon">
							<img src=${this.podcast.cover} alt=${this.podcast.name}>
						</div>
						<div class="info">
							<h4 class="text-center">${this.podcast.name}</h4>
							<p>
								<span class="text-center">
									<span>Author: </span>
									<span>${this.podcast.author}</span>
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
