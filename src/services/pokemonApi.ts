export const getPokemonList = (page: number, elementByPage: number) => {
  return fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${elementByPage}&offset=${
      elementByPage * (page - 1)
    }`
  );
};

export const getPokemonDetailsByName = (pokemonName: string) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
};

export const getPokemonDetailsById = (pokemonId: number) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
};
