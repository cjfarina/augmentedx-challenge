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
        <tr>
          <td colSpan={8} className="text-center">
            <Spinner />
          </td>
        </tr>
      ) : null}
      {error ? (
        <tr>
          <td colSpan={8} className="text-center">
            <div className="p-5">{error.message}</div>
          </td>
        </tr>
      ) : null}
      {!data?.length && !isValidating && !error ? (
        <tr>
          <td colSpan={8} className="text-center">
            <div className="p-5">No data to show</div>
          </td>
        </tr>
      ) : (
        children
      )}
    </>
  );
};

export default TableLoading;
