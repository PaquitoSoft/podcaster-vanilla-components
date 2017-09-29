import HomePage from '../components/home-page/home-page.js';
import PodcastPage from '../components/podcast-page/podcast-page.js';
import EpisodePage from '../components/episode-page/episode-page.js';

const routingConfig = [
	{
		pattern: /^\/$/,
		component: HomePage
	},
	{
		pattern: /^\/podcast\/(\d*)\/?$/,
		paramsResolver: (urlMatch) => {
			return {
				podcastId: urlMatch[1]
			}
		},
		component: PodcastPage
	},
	{
		pattern: /^\/podcast\/(\d*)\/episode\/(.*)\/?$/,
		paramsResolver: (urlMatch) => {
			return {
				podcastId: urlMatch[1],
				episodeId: urlMatch[2]
			}
		},
		component: EpisodePage
	}
];

export default routingConfig;
