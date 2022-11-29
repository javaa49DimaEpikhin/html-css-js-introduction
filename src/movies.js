const jsonData = '{"page":1,"results":[{"adult":false,"backdrop_path":"/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg","genre_ids":[28,14,878],"id":436270,"original_language":"en","original_title":"Black Adam","overview":"Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.","popularity":15075.276,"poster_path":"/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg","release_date":"2022-10-19","title":"Black Adam","video":false,"vote_average":7.2,"vote_count":1888},{"adult":false,"backdrop_path":"/kmzppWh7ljL6K9fXW72bPN3gKwu.jpg","genre_ids":[14,28,35,80],"id":1013860,"original_language":"en","original_title":"R.I.P.D. 2: Rise of the Damned","overview":"When Sheriff Roy Pulsipher finds himself in the afterlife, he joins a special police force and returns to Earth to save humanity from the undead.","popularity":6040.388,"poster_path":"/g4yJTzMtOBUTAR2Qnmj8TYIcFVq.jpg","release_date":"2022-11-15","title":"R.I.P.D. 2: Rise of the Damned","video":false,"vote_average":6.8,"vote_count":152},{"adult":false,"backdrop_path":"/kpUre8wWSXn3D5RhrMttBZa6w1v.jpg","genre_ids":[35,10751,14],"id":338958,"original_language":"en","original_title":"Disenchanted","overview":"Disillusioned with life in the city, feeling out of place in suburbia, and frustrated that her happily ever after hasn’t been so easy to find, Giselle turns to the magic of Andalasia for help. Accidentally transforming the entire town into a real-life fairy tale and placing her family’s future happiness in jeopardy, she must race against time to reverse the spell and determine what happily ever after truly means to her and her family.","popularity":3316.598,"poster_path":"/4x3pt6hoLblBeHebUa4OyiVXFiM.jpg","release_date":"2022-11-16","title":"Disenchanted","video":false,"vote_average":7.5,"vote_count":352}]}'
const httpPrefix = "https://image.tmdb.org/t/p/w500";


const moviesData = JSON.parse(jsonData);


const MoviesList = document.querySelector(".movies-list");
const sectionElements = document.querySelectorAll("section");
const mostPopularMovie = document.querySelector(".most-popular-movie");
const leastPopularMovie = document.querySelector(".least-popular-movie");

MoviesList.innerHTML = getMoviesList();
mostPopularMovie.innerHTML = getMostPopularMovie();
leastPopularMovie.innerHTML = getLeastpopularMovie();

function getMoviesList() {
    const MoviesList = moviesData.results.map(movie =>
        `<li class="movie-item">
            <img class="movie-poster" src="${httpPrefix}${movie.poster_path}">
            <div class="movie-details">
                <h1 class="movie-title">${movie.original_title}</h1>
                <p class="movie-descripton">${movie.overview}<p>
            </div>
        </li>`);
    return MoviesList.join('');
}

function getMostPopularMovie() {
    const mostPopularMovie = moviesData.results.reduce((maxPopularMovie, currentMovie) => {
        return (maxPopularMovie.popularity > currentMovie.popularity) ? maxPopularMovie : currentMovie;
    });
    const movieInfo =
        `<div class="single-movie">
            <div class="movie-item">
                <img class="movie-poster" src="${httpPrefix}${mostPopularMovie.poster_path}">
                <div class="movie-details">
                    <h1 class="movie-title">${mostPopularMovie.original_title}</h1>
                    <p class="movie-descripton">${mostPopularMovie.overview}<p>
                </div>
            </div>
        </div>`;
    return movieInfo;
}

function getLeastpopularMovie() {
    const leastPopularMovie = moviesData.results.reduce((minPopularMovie, currentMovie) => {
        return (minPopularMovie.popularity > currentMovie.popularity) ? currentMovie : minPopularMovie;
    });
    const movieInfo =
        `<div class="single-movie">
            <div class="movie-item">
                <img class="movie-poster" src="${httpPrefix}${leastPopularMovie.poster_path}">
                <div class="movie-details">
                    <h1 class="movie-title">${leastPopularMovie.original_title}</h1>
                    <p class="movie-descripton">${leastPopularMovie.overview}<p>
                </div>
            </div>
        </div>`;
    return movieInfo;
}

function show(index) {
    sectionElements.forEach(section => section.hidden = true);
    sectionElements[index].hidden = false;
}
