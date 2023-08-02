import { MouseEventHandler } from 'react';

import { SortKeys, SortOrder } from '@/types';

function SortButton({
  sortOrder,
  columnKey,
  sortKey,
  onClick,
}: {
  sortOrder: SortOrder;
  columnKey: SortKeys;
  sortKey: SortKeys;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer transition-transform ease-in-out bg-blue-200 hover:bg-blue-700 text-black font-bold pb-1 px-1 ml-2 rounded-full
      ${sortKey === columnKey && sortOrder === 'desc' ? 'transform rotate-180' : ''}`}
    >
      ▲
    </button>
  );
}

export default SortButton;
