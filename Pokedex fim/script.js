document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search');
    const pokemonDisplay = document.getElementById('pokemon-display');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    
    let currentPokemonId = 1;

    const fetchPokemon = async (id) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
            if (!response.ok) throw new Error('Pokémon não encontrado');
            const pokemon = await response.json();
            displayPokemon(pokemon);
        } catch (error) {
            pokemonDisplay.innerHTML = `<p>${error.message}</p>`;
        }
    };

    const displayPokemon = (pokemon) => {
        const type = pokemon.types[0].type.name;
        const color = typeColors[type] || '#fff';

        pokemonDisplay.style.backgroundColor = color;

        pokemonDisplay.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h2>${pokemon.name.toUpperCase()}</h2>
            <p>ID: ${pokemon.id}</p>
            <p>Tipo: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
        `;
    };

    const typeColors = {
        fire: '#F08030',
        water: '#6890F0',
        grass: '#78C850',
        electric: '#F8D030',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#F0B6BC',
        normal: '#A8A878'
    };

    searchButton.addEventListener('click', () => {
        const id = searchInput.value.trim().toLowerCase();
        if (id) {
            fetchPokemon(id);
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentPokemonId > 1) {
            currentPokemonId--;
            fetchPokemon(currentPokemonId);
        }
    });

    nextButton.addEventListener('click', () => {
        currentPokemonId++;
        fetchPokemon(currentPokemonId);
    });

    // Load the first Pokemon on initial load
    fetchPokemon(currentPokemonId);
});
