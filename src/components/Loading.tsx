import { SerializedPokemon } from '@/types';

import { Spinner } from './Spinner';

const Loading = (
  isValidating: boolean,
  error: Error,
  data: SerializedPokemon[] | undefined,
  children: JSX.Element | undefined,
) => {
  return (
    <>
      {isValidating && !error ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : null}
      {error ? <div className="flex justify-center">{error.message}</div> : null}
      {!data?.length && !isValidating && !error ? (
        <div className="flex justify-center">No data to show</div>
      ) : (
        children
      )}
    </>
  );
};

export default Loading;
