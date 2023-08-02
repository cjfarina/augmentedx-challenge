import axios, { AxiosResponse } from 'axios';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import useSWR from 'swr';

import { SerializedPokemon, SortKeys, SortOrder } from '@/types';
import { fadeIn } from '@/utils/animations';

import TableLoading from './TableLoading';
import SortButton from './SortButton';

export type TableProps = {
  search: string;
};

const statsHeaders: { key: SortKeys; label: string }[] = [
  { key: 'HP', label: 'HP' },
  { key: 'Attack', label: 'Attack' },
  { key: 'Defense', label: 'Defense' },
  { key: 'Sp. Attack', label: 'Sp. Attack' },
  { key: 'Sp. Defense', label: 'Sp. Defense' },
  { key: 'Speed', label: 'Speed' },
];

/**
 * Table component that renders Pokémons. The list of Pokémons can be filtered
 * by search params, allowing users to search Pokémons by their name.
 * The component allows sort by stats by clicking on the header of the respected
 * column. Columns can be sorted ascending, descending.
 * @param param
 * @returns
 */

export const Table = ({ search }: TableProps) => {
  const [sortKey, setSortKey] = useState<SortKeys>('HP');
  const [sortOrder, setSortOrder] = useState<SortOrder>('ascn');

  const {
    isValidating,
    error,
    data: response,
  } = useSWR<AxiosResponse<SerializedPokemon[]>>(`pokemons-${search}-${sortKey}-${sortOrder}`, () =>
    axios(`/api/pokemons?name=${search}&sort-key=${sortKey}&sort-order=${sortOrder}`),
  );

  const changeSort = useCallback(
    (key: SortKeys) => {
      setSortOrder(sortOrder === 'ascn' ? 'desc' : 'ascn');
      setSortKey(key);
    },
    [sortOrder],
  );

  return (
    <div className="flex">
      <table className="w-full text-sm text-left bg-slate-100">
        <thead className="text-xs text-gray-700 uppercase bg-slate-100">
          <tr>
            <th key="image" scope="col" className="px-6 py-3" style={{ width: 160 }}></th>
            <th key="name" scope="col" className="px-6 py-3">
              Name
            </th>
            {statsHeaders.map((row) => {
              return (
                <th key={row.key} scope="col" className="px-6 py-3">
                  <div className="flex">
                    {row.label}
                    <SortButton
                      columnKey={row.key}
                      onClick={() => changeSort(row.key)}
                      {...{
                        sortOrder,
                        sortKey,
                      }}
                    />
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {TableLoading(
            isValidating,
            error,
            response?.data,
            <>
              {response?.data.map((pokemon) => (
                <motion.tr
                  variants={fadeIn}
                  key={pokemon.id}
                  className="bg-white border-b  bg-slate-50 border-slate-300"
                >
                  <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <div
                      className="ml-auto rounded-lg border-slate-300 border bg-white"
                      style={{ maxWidth: 120 }}
                    >
                      <Image
                        src={pokemon.image}
                        aria-label={pokemon.name}
                        alt={pokemon.name}
                        width={120}
                        height={120}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">{pokemon.name}</td>
                  <td className="px-6 py-4">{pokemon.stats.HP}</td>
                  <td className="px-6 py-4">{pokemon.stats.Attack}</td>
                  <td className="px-6 py-4">{pokemon.stats.Defense}</td>
                  <td className="px-6 py-4">{pokemon.stats['Sp. Attack']}</td>
                  <td className="px-6 py-4">{pokemon.stats['Sp. Defense']}</td>
                  <td className="px-6 py-4">{pokemon.stats.Speed}</td>
                </motion.tr>
              ))}
            </>,
          )}
        </tbody>
      </table>
    </div>
  );
};
