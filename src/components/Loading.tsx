import { SerializedPokemon } from '@/types';

import { Spinner } from './Spinner';

const Loading = (
  isValidating: boolean,
  error: Error,
  data: SerializedPokemon[] | undefined,
  children: JSX.Element | undefined,
  loading: JSX.Element = (
    <div className="flex justify-center">
      <Spinner />
    </div>
  ),
  noData: JSX.Element = <div className="flex justify-center">No data to show</div>,
) => {
  return (
    <>
      {isValidating && !error ? loading : null}
      {error ? <div className="flex justify-center">{error.message}</div> : null}
      {!data?.length && !isValidating && !error ? noData : children}
    </>
  );
};

export default Loading;
