export const routingConfig = [
	{
		pattern: /^\/$/,
		componentPath: 'home-page/home-page.js'
	},
	{
		pattern: /^\/podcast\/(\d*)\/?$/,
		paramsResolver: (urlMatch) => {
			return {
				podcastId: urlMatch[1]
			}
		},
		componentPath: 'podcast-page/podcast-page.js'
	},
	{
		pattern: /^\/podcast\/(\d*)\/episode\/(.*)\/?$/,
		paramsResolver: (urlMatch) => {
			return {
				podcastId: urlMatch[1],
				episodeId: urlMatch[2]
			}
		},
		componentPath: 'episode-page/episode-page.js'
	}
];
