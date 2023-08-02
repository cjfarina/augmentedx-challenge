import { SerializedPokemon } from '@/types';

import { Spinner } from './Spinner';

interface Props {
  children: React.ReactNode;
}

const TableFragment = ({ children }: Props) => {
  return (
    <tr>
      <td colSpan={8} className="text-center">
        {children}
      </td>
    </tr>
  );
};

const TableLoading = (
  isValidating: boolean,
  error: Error,
  data: SerializedPokemon[] | undefined,
  children: JSX.Element | undefined,
) => {
  return (
    <>
      {isValidating && !error ? (
        <TableFragment>
          <Spinner />
        </TableFragment>
      ) : null}
      {error ? (
        <TableFragment>
          <div className="p-5">{error.message}</div>
        </TableFragment>
      ) : null}
      {!data?.length && !isValidating && !error ? (
        <TableFragment>
          <div className="p-5">No data to show</div>
        </TableFragment>
      ) : (
        children
      )}
    </>
  );
};

export default TableLoading;
