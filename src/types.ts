export type PokemonName = {
  english: string;
  japanese: string;
  chinese: string;
  french: string;
};

export type PokemonStats = {
  HP: string;
  Attack: string;
  Defense: string;
  'Sp. Attack': string;
  'Sp. Defense': string;
  Speed: string;
};

export type Pokemon = {
  id: number;
  name: PokemonName;
  type: string[];
  stats: PokemonStats;
};

export type SerializedPokemon = Omit<Pokemon, 'name'> & {
  id: number;
  image: string;
  name: PokemonName['english'];
};

export type SortKeys = keyof PokemonStats;
export type SortOrder = 'ascn' | 'desc';
