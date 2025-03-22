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
        // Send the updated movies list to the server
        fetch('data.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movies })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Movie added:', { title, genre });
        })
        .catch(error => console.error('Error updating data:', error));
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