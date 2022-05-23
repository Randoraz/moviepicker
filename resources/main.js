const api = '4bb7b23df00fb778e3814561116faee3';
const baseUrl = 'https://api.themoviedb.org/3';

//DOM Elements
const searchBtn = document.getElementById('search-button');
const movieTitle = document.getElementById('movie-title');
const releaseDate = document.getElementById('movie-release-date');
const moviePoster = document.getElementById('movie-poster');
const movieOverview = document.getElementById('movie-overview');

//Gets the list of movie genres
const getGenreList = async () => {
    const urlToFetch = `${baseUrl}/genre/movie/list?api_key=${api}`;

    try {
        const response = await fetch(urlToFetch, {cache: 'no-cache'});
        if(response.ok) {
            const genreList = await response.json();
            return genreList.genres;
        }
    } catch(error) {
        console.log(error);
    }
};

//Fills dropdown with genre list
const fillGenreDropdown = list => {
    const selectField = document.getElementById('genre');

    for(const genre of list) {
        let option = document.createElement('option');
        option.value = genre.id;
        option.text = genre.name;
        selectField.appendChild(option);
    }
}

getGenreList().then(fillGenreDropdown);



//Gets the list of movies in the selected genre from a random page
const getMoviesByGenre = async () => {
    const selectedGenre = document.getElementById('genre').value;
    const randPage = Math.floor(Math.random() * 500 + 1);
    const urlToFetch = `${baseUrl}/discover/movie?api_key=${api}&include_adult=false&page=${randPage}&with_genres=${selectedGenre}`;

    try {
        const response = await fetch(urlToFetch, {cache: 'no-cache'});
        if(response.ok) {
            const jsonResponse = await response.json();
            const movieList = jsonResponse.results;
            return movieList;
        } 
    } catch(error) {
        console.log(error);
    }
}

//Gets one random movie from the movies list
const getMovie = async (movieList) => {
    const randNum = Math.floor(Math.random() * movieList.length)
    const movieId = movieList[randNum].id;
    const urlToFetch = `${baseUrl}/movie/${movieId}?api_key=${api}`;

    try {
        const response = await fetch(urlToFetch, {cache: 'no-cache'});
        if(response.ok) {
            const movie = await response.json();
            return movie;
        }
    } catch(error) {
        console.log(error);
    }
}

//Shows the movie info
const showMovieInfo = async () => {
    const movieList = await getMoviesByGenre();
    const movie = await getMovie(movieList);

    //Shows movie title
    movieTitle.innerHTML = movie.title;

    //Shows movie release date
    const date = new Date(movie.release_date);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    releaseDate.innerHTML = date.toLocaleDateString('en-US', options);

    //Shows movie poster
    const posterPath = movie.poster_path;
    moviePoster.setAttribute('src', `http://image.tmdb.org/t/p/original/${posterPath}`);
    moviePoster.setAttribute('id', 'movie-poster');

    //Shows movie overview
    movieOverview.innerHTML = movie.overview;
}

searchBtn.onclick = showMovieInfo;