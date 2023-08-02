import { NextApiRequest, NextApiResponse } from 'next';

import pokemonData from '@/pokemon.json';
import { SortKeys, SortOrder } from '@/types';
import { filterPokemons } from '@/utils/apiHelpers';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const filterQueryName = req.query.name ? new RegExp(String(req.query.name), 'i') : /.*/;
  const sortKey = req.query['sort-key'] ? (req.query['sort-key'] as SortKeys) : null;
  const sortOrder = req.query['sort-order'] ? (req.query['sort-order'] as SortOrder) : null;

  const filteredPokemons = filterPokemons(pokemonData, filterQueryName, sortKey, sortOrder);

  res.status(200).json(filteredPokemons);
};
