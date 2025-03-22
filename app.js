document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('data-container');
            const genreFilter = document.getElementById('genre-filter');
            const moviesByGenre = data.movies.reduce((acc, movie) => {
                if (!acc[movie.genre]) {
                    acc[movie.genre] = [];
                }
                acc[movie.genre].push(movie.title);
                return acc;
            }, {});

            // Populate genre filter
            Object.keys(moviesByGenre).forEach(genre => {
                const option = document.createElement('option');
                option.value = genre;
                option.textContent = genre;
                genreFilter.appendChild(option);
            });

            // Function to render movies
            const renderMovies = (selectedGenre) => {
                container.innerHTML = '';
                const genresToRender = selectedGenre === 'all' ? moviesByGenre : { [selectedGenre]: moviesByGenre[selectedGenre] };
                for (const genre in genresToRender) {
                    const genreDiv = document.createElement('div');
                    genreDiv.classList.add('genre');
                    const genreTitle = document.createElement('h2');
                    genreTitle.textContent = genre;
                    genreDiv.appendChild(genreTitle);

                    const movieList = document.createElement('ul');
                    genresToRender[genre].forEach(title => {
                        const movieItem = document.createElement('li');
                        movieItem.textContent = title;
                        movieList.appendChild(movieItem);
                    });

                    genreDiv.appendChild(movieList);
                    container.appendChild(genreDiv);
                }
            };

            // Initial render
            renderMovies('all');

            // Filter movies on genre change
            genreFilter.addEventListener('change', (event) => {
                renderMovies(event.target.value);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});