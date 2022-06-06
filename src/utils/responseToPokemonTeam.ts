import { iPokemonTeam } from "../interfaces/iPokemonTeam";

export const responseToPokemonTeam = (response: any): Array<iPokemonTeam> => {
  return Object.keys(response).map((key) => ({ ...response[key], id: key }));
};
