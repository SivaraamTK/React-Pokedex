import { FC } from 'react';

interface NavigationButtonsProps {
  currentOffset: number;
  setOffset: (offset: number) => void;
}

export const NavigationButtons: FC<NavigationButtonsProps> = ({
  currentOffset,
  setOffset,
}) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        type="button"
        onClick={() => setOffset(currentOffset - 20)}
        disabled={currentOffset === 0}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </button>
      <span id='navSpan' className="text-lg font-bold">
        {currentOffset + 1} - {currentOffset + 20}
      </span>
      <button
        type="button"
        onClick={() => setOffset(currentOffset + 20)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </div>
  );
};
