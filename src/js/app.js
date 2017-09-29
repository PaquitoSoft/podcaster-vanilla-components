import routingConfig from './config/routing.js';
import Router from './components/shared/router/router.js';

const app = document.createElement('div');

app.innerHTML = `
	<div class="header clearfix">
		<h3 class="text-muted">
			<a href="/">Podcaster</a>
			<div class="spinner hidden">
				<div class="double-bounce1"></div>
				<div class="double-bounce2"></div>
			</div>
		</h3>
	</div>

	<div class="main-content"></div>
`;

Router.setup({
	routingConfig,
	mountingElement: app.querySelector('.main-content'),
	loadingCallback: function(appSpinner, isLoading) {
		const operation = isLoading ? 'remove' : 'add';
		appSpinner.classList[operation]('hidden');
	}.bind(null, app.querySelector('.spinner'))
});

document.getElementById('root').appendChild(app);
