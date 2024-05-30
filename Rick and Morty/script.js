document.addEventListener('DOMContentLoaded', () => {
    let apiUrl = 'https://rickandmortyapi.com/api/character';
    let nextPage = null;
    let prevPage = null;

    const apiDataDiv = document.getElementById('api-data');
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');

    function fetchData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                apiDataDiv.innerHTML = ''; // Clear previous data
                const characters = data.results;
                nextPage = data.info.next;
                prevPage = data.info.prev;

                characters.forEach(character => {
                    const characterDiv = document.createElement('div');
                    characterDiv.classList.add('character');

                    characterDiv.innerHTML = `
                        <img src="${character.image}" alt="${character.name}">
                        <h2>${character.name}</h2>
                        <p><strong>Estado:</strong> ${character.status}</p>
                        <p><strong>Especie:</strong> ${character.species}</p>
                        <p><strong>Género:</strong> ${character.gender}</p>
                        <p><strong>Origen:</strong> ${character.origin.name}</p>
                        <p><strong>Ubicación:</strong> ${character.location.name}</p>
                    `;

                    apiDataDiv.appendChild(characterDiv);
                });

                // Disable/Enable buttons based on pagination availability
                prevButton.disabled = !prevPage;
                nextButton.disabled = !nextPage;
            })
            .catch(error => console.error('Error al consumir la API:', error));
    }

    nextButton.addEventListener('click', () => {
        if (nextPage) {
            fetchData(nextPage);
        }
    });

    prevButton.addEventListener('click', () => {
        if (prevPage) {
            fetchData(prevPage);
        }
    });

    // Initial fetch
    fetchData(apiUrl);
});
