export const getPokemonList = (page: number, elementByPage: number) => {
  return fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${elementByPage}&offset=${
      elementByPage * (page - 1)
    }`
  ).then((res) => res.json());
};

export const getPokemonDetailsByName = (pokemonName: string) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((res) =>
    res.json()
  );
};

export const getPokemonDetailsById = (pokemonId: number) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then((res) =>
    res.json()
  );
};
