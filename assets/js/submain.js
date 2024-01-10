const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

const maxRecords = 1350;
const limit = 40;
let offset = 0;
let globalIndex = 0;

const pokemonsInfo = [];

function convertPokemonToLi(pokemon, index) {
  const dataIndex = globalIndex++;
  return `
    <li class="pokemon ${pokemon.type}" data-index="${dataIndex}">
      <span class="number">${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>
      <div class="detail">
        <ol class="types">
          ${pokemon.types
            .map((type) => `<li class="type ${type}">${type}</li>`)
            .join("")}
        </ol>
        <img src="${pokemon.photo}" alt="${pokemon.name}" />
        
      </div>
    </li>
  `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonsInfo.push(...pokemons);
    const newHtml = pokemons
      .map((pokemon, index) => convertPokemonToLi(pokemon, index))
      .join("");
    pokemonList.innerHTML += newHtml;

    const openPokemonDetail = document.querySelectorAll(".pokemon");
    openPokemonDetail.forEach((pokemon) => {
      pokemon.addEventListener("click", (event) => {
        const index = event.target.closest(".pokemon").dataset.index;
        showPokemonDetails(index);
      });
    });
  });
}

function showPokemonDetails(index) {
  const pokemon = pokemonsInfo[index];
  const modalContentHtml = `
    <div class="statsPokemon ${pokemon.types[0]}" style="opacity: 0.9;">
    <img src="${pokemon.photo}" alt="${pokemon.name}" />
    <h2 class="name">${pokemon.name}</h2>
    
    <ol class="types">
          ${pokemon.types
            .map((type) => `<li class="typeDetail ${type}">${type}</li>`)
            .join("")}
        </ol>
        <div class="statsBasePokemon">
        <ol class="types">
          ${pokemon.stats
            .map((stat) => `<li class="typeDetail ${stat}">${stat}</li>`)
            .join("")}
        </ol>
        <ol class="types">
          ${pokemon.statsNumber
            .map((stat) => `<li class="typeDetail ${stat}">${stat}</li>`)
            .join("")}
        </ol> 
        </div>
    
    </div>
  `;
  modalContent.innerHTML = modalContentHtml;
  modal.classList.add("show");
  overlay.classList.add("show");
}

function closeOverlay() {
  modal.classList.remove("show");
  overlay.classList.remove("show");
}

overlay.addEventListener("click", closeOverlay);

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
