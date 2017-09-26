export default function PodcastSummary(podcast) {
	return `
		<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 podcast-summary">
			<div class="box">
				<a href="/podcast/${podcast.id}">
					<div class="box-icon">
						<img src=${podcast.cover} alt=${podcast.name}>
					</div>
					<div class="info">
						<h4 class="text-center">${podcast.name}</h4>
						<p>
							<span class="text-center">
								<span>Author: </span>
								<span>${podcast.author}</span>
							</span>
						</p>
					</div>
				</a>
			</div>
		</div>
	`;
}
