import { Pokemon, SerializedPokemon, SortKeys, SortOrder } from '@/types';

export const getPokemonImage = (pokemonId: number): string => {
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId
    .toString()
    .padStart(3, '0')}.png`;
};

export const serializePokemon = (pokemon: Pokemon): SerializedPokemon => ({
  ...pokemon,
  image: getPokemonImage(pokemon.id),
  name: pokemon.name.english,
});

export const findPokemon = (pokemonData: Pokemon[], name: string) =>
  pokemonData.find((pokemon) => pokemon.name.english === name);

export const filterPokemons = (
  pokemons: Pokemon[],
  filterQueryName: string | RegExp,
  sortKey: SortKeys | null,
  sortOrder: SortOrder | null,
): SerializedPokemon[] => {
  const filteredPokemons = pokemons
    .filter((pokemon) => pokemon.name.english.match(filterQueryName))
    .slice(0, 10);

  if (sortKey) {
    const reverse = sortOrder === 'desc' ? -1 : 1;
    filteredPokemons.sort((a, b) => {
      let sortValue;
      sortValue = Number(a.stats[sortKey]) > Number(b.stats[sortKey]) ? 1 : -1;
      return sortValue * reverse;
    });
  }

  return filteredPokemons.map(serializePokemon);
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
