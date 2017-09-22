const mockData = [{"id":"657476401","name":"Tiny Desk Concerts - Audio","author":"NPR","description":"Tiny Desk Concerts from NPR Music feature your favorite musicians performing at All Songs Considered host Bob Boilen's desk in the NPR office. Hear Wilco, Adele, Passion Pit, Tinariwen, Miguel, The xx and many more. This is the audio version of the podcast. A video version is also available.","releaseDate":"September 21, 2017","lastEpisodeDate":1506028920000,"cover":"http://is2.mzstatic.com/image/thumb/Podcasts62/v4/99/99/6f/99996fc9-b149-70c0-421d-d21a4325776a/mza_4791149985339305774.jpg/170x170bb-85.jpg","episodes":[],"isFavorite":false},{"id":"362115318","name":"Tiny Desk Concerts - Video","author":"NPR","description":"Tiny Desk Concerts from NPR's All Songs Considered features your favorite musicians performing at Bob Boilen's desk in the NPR Music office. Watch videos from Passion Pit, The xx, Wilco, Adele, Phoenix, Tinariwen, tUnE-yArDs and many more.","releaseDate":"September 21, 2017","lastEpisodeDate":1506026700000,"cover":"http://is1.mzstatic.com/image/thumb/Podcasts71/v4/19/ae/93/19ae9330-10d2-f755-25bd-445721e92ff9/mza_3202149667705386526.jpg/170x170bb-85.jpg","episodes":[],"isFavorite":false},{"id":"649744869","name":"Spinnin' Sessions","author":"Spinnin' Records","description":"Spinnin' Records proudly presents its weekly radio show: Spinnin' Sessions. Besides providing you with the most upfront dance floor tracks of the moment, Spinnin Sessions will also welcome a weekly guest DJ for a special 30 minute mix. Enjoy!","releaseDate":"September 21, 2017","lastEpisodeDate":1506025800000,"cover":"http://is3.mzstatic.com/image/thumb/Features/v4/cc/67/82/cc678269-c69b-33cf-f9e3-56cfb8355952/mza_2059060134152054157.jpg/170x170bb-85.jpg","episodes":[],"isFavorite":false},{"id":"617028866","name":"www.los40.com.mx - La Corneta","author":"www.los40.com.mx","description":"Programa de infoteinment: Información con entretenimiento, conducido por Eduardo Videgaray y Jose Ramón San Cristobal (El Estaca). Lunes a viernes de 1 a 3 PM por Los 40","releaseDate":"September 21, 2017","lastEpisodeDate":1506024480000,"cover":"http://is5.mzstatic.com/image/thumb/Podcasts62/v4/11/08/c5/1108c5c5-6966-74d0-f937-4532082b2e22/mza_7867131696435904428.jpg/170x170bb-85.jpg","episodes":[],"isFavorite":false}];

export function getAllPodcasts() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockData);
        }, 800);
    });
}

export function getPodcastDetail(podcastId) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(mockData.find(podcast => podcast.id === podcastId));
		}, 800);
	});
}
