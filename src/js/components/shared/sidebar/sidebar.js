import BaseComponent from '../base-component/base-component.js';

class Sidebar extends BaseComponent {

	constructor(podcast = {}) {
		super({ podcast });
	}

	html() {
		const podcast = this.state.podcast;

		return `
			<div class="col-md-3 section">
				<div class="podcast-cover text-center">
					<a href="${`/podcast/${podcast.id}`}">
						<img src="${podcast.cover}" alt="${podcast.name}">
					</a>
				</div>
				<hr/>
				<div class="podcast-title">
					<a href="${`/podcast/${podcast.id}`}">
						<div class="title">${podcast.name}</div>
						<div class="author"><span>by&nbsp;</span>${podcast.author}</div>
					</a>
				</div>
				<hr/>
				<div class="podcast-description">
					<div>Description:</div>
					<p>${podcast.description}</p>
				</div>
			</div>
		`;
	}
}

export default Sidebar;
