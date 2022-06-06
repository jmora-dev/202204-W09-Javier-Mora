import { iPokemonDetails } from "../interfaces/iPokemonDetails";

export const responseToPokemonDetails = (data: any): iPokemonDetails => {
  return {
    id: data.id,
    name: data.name,
    order: data.order,
    height: data.height,
    weight: data.weight,
    spriteDefault: data.sprites.front_default,
  };
};
