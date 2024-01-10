const pokeApi = {};

function convertPoleApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  const stats = pokeDetail.stats.map((statStat) => statStat.stat.name);
  const [stat] = stats;
  pokemon.stat = stat;
  pokemon.stats = stats;

  const statsNumber = pokeDetail.stats.map((statStat) => statStat.base_stat);
  pokemon.statsNumber = statsNumber;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPoleApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 50) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return (
    fetch(url)
      // quando da certo (funcoes de uma linha podem ser escritas da maneira abaixo)
      .then((response) => response.json())
      .then((jsonBody) => jsonBody.results)
      .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
      .then((detailRequests) => Promise.all(detailRequests))
      .then((pokemonsDetails) => pokemonsDetails)
      // quando da erro
      .catch((error) => console.error(error))
      // independente de certo ou errado
      .finally(() => console.log("Requisição Concluída!"))
  );
};
