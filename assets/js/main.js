const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 30;
let offset = 0;
const maxRecords = 895;


function loadPokemonItens(offset, limit){
    function convertPokemonToLi(pokemon) {
        if (pokemon.number>99) pokemon.number = '#'+pokemon.number;
        else if (pokemon.number>9) pokemon.number = '#0' +pokemon.number;
        else pokemon.number='#00'+pokemon.number;
        return `
        <li class="pokemon ${pokemon.type}">
        <span class="number">${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail"> 
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        </li>
        `;
    }
    pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');
    }); 
}

loadPokemonItens(offset,limit);

loadMoreButton.addEventListener('click', () => {
    offset+=limit;
    const qtdRecordNextPage = offset +limit;
    if (qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }
    else {
        loadPokemonItens(offset, limit);
    }
});
