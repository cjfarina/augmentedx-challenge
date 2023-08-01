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
  id: string;
  name: PokemonName;
  type: string[];
  stats: PokemonStats;
};

export type SerializedPokemon = Omit<Pokemon, 'name'> & {
  id: string;
  image: string;
  name: PokemonName['english'];
};
