export interface iPokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: iPokemonListElements;
}

export interface iPokemonListElement {
  name: string;
  url: string;
}

export type iPokemonListElements = Array<iPokemonListElement>;
