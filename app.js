document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('data-container');
            const moviesByGenre = data.movies.reduce((acc, movie) => {
                if (!acc[movie.genre]) {
                    acc[movie.genre] = [];
                }
                acc[movie.genre].push(movie.title);
                return acc;
            }, {});

            for (const genre in moviesByGenre) {
                const genreDiv = document.createElement('div');
                genreDiv.classList.add('genre');
                const genreTitle = document.createElement('h2');
                genreTitle.textContent = genre;
                genreDiv.appendChild(genreTitle);

                const movieList = document.createElement('ul');
                moviesByGenre[genre].forEach(title => {
                    const movieItem = document.createElement('li');
                    movieItem.textContent = title;
                    movieList.appendChild(movieItem);
                });

                genreDiv.appendChild(movieList);
                container.appendChild(genreDiv);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});