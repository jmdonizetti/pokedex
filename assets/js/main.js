const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokeInfo = document.getElementById('pokeInfo')

const maxRecords = 151;
const limit = 10;
let offset= 0;


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">
            <ol class="types">
            <span class="info1 info2" id="experience">EXP: ${pokemon.experience}</span>
            ${pokemon.abilities.map((ability) => `<li class="info1 info2 ${ability}">${ability}</li>`).join('')}
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img class="gif"src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/${pokemon.name}.gif">
            <img class="photo"src="${pokemon.photo}"alt="${pokemon.name}">
        </div>
        </li>`
}



function loadPokemonItems (offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItems(offset,limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordWithNextPage = offset + limit

    if (qtdRecordWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }
})





