document.addEventListener('DOMContentLoaded', () => {
    let movies = [];

    const fetchMovies = () => {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                movies = data.movies;
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const addMovie = (title, genre) => {
        movies.push({ title, genre });
        // Here you would typically send the updated movies list to the server
        console.log('Movie added:', { title, genre });
    };

    document.getElementById('movie-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const genre = event.target.genre.value;
        addMovie(title, genre);
        event.target.reset();
    });

    fetchMovies();
});