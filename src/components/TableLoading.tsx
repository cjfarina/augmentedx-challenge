import { SerializedPokemon } from '@/types';

import { Spinner } from './Spinner';

const TableLoading = (
  isValidating: boolean,
  error: Error,
  data: SerializedPokemon[] | undefined,
  children: JSX.Element | undefined,
) => {
  return (
    <>
      {isValidating && !error ? (
        <td colSpan={8} className="text-center">
          <Spinner />
        </td>
      ) : null}
      {error ? (
        <div className="flex justify-center">
          {
            <td colSpan={8} className="text-center">
              <div className="p-5">{error.message}</div>
            </td>
          }
        </div>
      ) : null}
      {!data?.length && !isValidating && !error ? (
        <td colSpan={8} className="text-center">
          <div className="p-5">No data to show</div>
        </td>
      ) : (
        children
      )}
    </>
  );
};

export default TableLoading;
