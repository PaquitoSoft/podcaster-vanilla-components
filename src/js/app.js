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

const appSpinner = app.querySelector('.spinner');

Router.setup(
	app.querySelector('.main-content'),
	({ isLoading }) => {
		const operation = isLoading ? 'remove' : 'add';
		appSpinner.classList[operation]('hidden');
	}
);

document.getElementById('root').appendChild(app);
