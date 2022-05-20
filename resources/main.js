const api = '4bb7b23df00fb778e3814561116faee3';
const baseUrl = 'https://api.themoviedb.org/3';

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

const getMoviesByGenre = async () => {
    const selectedGenre = document.getElementById('genre').value;
}