import HomePage from './components/home-page/home-page.js';

class App {
    render() {
        return `
            <div>
                <div class="header clearfix">
                    <h3 class="text-muted">
                        <a href="/">Podcaster</a>
                        <div class="spinner hidden">
                            <div class="double-bounce1"></div>
                            <div class="double-bounce2"></div>
                        </div>
                    </h3>
                </div>

                <div class="main-content">
                    ${(new HomePage()).render()}
                </div>
            </div>
        `;
    }
}

const app = new App();

document.getElementById('root').innerHTML = app.render();
