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

Router.setup(app.querySelector('.main-content'));

document.getElementById('root').appendChild(app);
