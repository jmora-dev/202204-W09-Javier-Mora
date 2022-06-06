import { iPokemonTeam } from "../interfaces/iPokemonTeam";

export const insertPokemonInTeam = (pokemon: iPokemonTeam) => {
  return fetch(
    "https://pokemon-team-e58bc-default-rtdb.europe-west1.firebasedatabase.app/team.json",
    {
      method: "POST",
      headers: { "content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(pokemon),
    }
  );
};

export const getPokemonTeam = (): Promise<Response> => {
  return fetch(
    "https://pokemon-team-e58bc-default-rtdb.europe-west1.firebasedatabase.app/team.json",
    { headers: { "content-type": "application/json;charset=UTF-8" } }
  );
};

export const deletePokemonFromTeam = (pokemonTeamId: string) => {
  return fetch(
    `https://pokemon-team-e58bc-default-rtdb.europe-west1.firebasedatabase.app/team/${pokemonTeamId}.json`,
    {
      method: "DELETE",
      headers: { "content-type": "application/json;charset=UTF-8" },
    }
  );
};

export const updateAliasPokemonFromTeam = (
  pokemonTeamId: string,
  newAlias: string
) => {
  return fetch(
    `https://pokemon-team-e58bc-default-rtdb.europe-west1.firebasedatabase.app/team/${pokemonTeamId}.json`,
    {
      method: "PATCH",
      headers: { "content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({ alias: newAlias }),
    }
  );
};
