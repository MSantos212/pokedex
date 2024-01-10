const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 250;
const limit = 40;
let offset = 0;

const pokemonsData = [];

function convertPokemonToLi(pokemon) {
  return `
    <li class="pokemon ${pokemon.type}" >
          <span class="number">${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
          <div class="detail">
            <ol class="types">
              ${pokemon.types
                .map((type) => `<li class="type ${type}">${type}</li>`)
                .join("")}
            </ol>
            <img
              src="${pokemon.photo}"
              alt="${pokemon.name}"
            />
          </div>
        </li>
        `;
}

function loadItems() {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map((pokemon) => convertPokemonToLi(pokemon))
      .join("");
    pokemonList.innerHTML += newHtml;
  });
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonsData.push(...pokemons);
    console.log(pokemonsData);
    const newHtml = pokemons
      .map((pokemon) => convertPokemonToLi(pokemon))
      .join("");
    pokemonList.innerHTML += newHtml;

    /* const pokemonItems = document.querySelectorAll(".pokemon");
    pokemonItems.forEach((pokemon) => {
      pokemon.addEventListener("click", () => loadItems());
      loadItems();
    }); */
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const qtdRecord = offset + limit;

  if (qtdRecord >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
