import { getAllPodcasts } from '../../api/podcaster.js';

class HomePage {

    constructor(/*data*/) {
        // this.originalPodcasts = data.podcasts;
        // this.filteredPodcasts = data.podcasts.concat([]); // clone

        this.originalPodcasts = [];
        this.filteredPodcasts = [];

        setTimeout(() => {
            this.onMounted();
        }, 500);
    }

    onMounted() {
        getAllPodcasts()
            .then(podcasts => {
                this.originalPodcasts = podcasts;
                this.filteredPodcasts = podcasts.concat([]); // clone
                this.render();
            });
    }

    filterPodcasts(filterValue) {
        this.filteredPodcasts = podcasts.filter(podcast => regExp.test(podcast.name + podcast.author));
        this.render();
    }

    render() {
        return `
            <div class="podcasts-grid">
                <div class="row filter">
                    <div class="col-md-5 col-md-offset-7">
                        <span class="badge">${this.filteredPodcasts.length}</span>
                        <input id="filter" type="text" class="form-control input-lg" autoFocus
                            placeholder="Filter podcasts..." on-input="filterPodcasts" value="">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="row podcasts">
                            <i>Listado de podcasts</i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

export default HomePage;
