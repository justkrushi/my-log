document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('data-container');
            const genreFilter = document.getElementById('genre-filter');
            const allItems = [
                ...data.movies.map(movie => ({ ...movie, type: 'Movie' })),
                ...data.shows.map(show => ({ ...show, type: 'Show' }))
            ];
            const itemsByGenre = allItems.reduce((acc, item) => {
                if (!acc[item.genre]) {
                    acc[item.genre] = [];
                }
                acc[item.genre].push(item);
                return acc;
            }, {});

            // Populate genre filter
            Object.keys(itemsByGenre).forEach(genre => {
                const option = document.createElement('option');
                option.value = genre;
                option.textContent = genre;
                genreFilter.appendChild(option);
            });

            // Function to render items
            const renderItems = (selectedGenre) => {
                container.innerHTML = '';
                const genresToRender = selectedGenre === 'all' ? itemsByGenre : { [selectedGenre]: itemsByGenre[selectedGenre] };
                for (const genre in genresToRender) {
                    const genreDiv = document.createElement('div');
                    genreDiv.classList.add('genre');
                    const genreTitle = document.createElement('h2');
                    genreTitle.textContent = genre;
                    genreDiv.appendChild(genreTitle);

                    const itemList = document.createElement('ul');
                    genresToRender[genre].forEach(item => {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${item.title} (${item.type})`;
                        itemList.appendChild(listItem);
                    });

                    genreDiv.appendChild(itemList);
                    container.appendChild(genreDiv);
                }
            };

            // Initial render
            renderItems('all');

            // Filter items on genre change
            genreFilter.addEventListener('change', (event) => {
                renderItems(event.target.value);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});