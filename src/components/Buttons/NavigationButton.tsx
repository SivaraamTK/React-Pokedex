import { FC } from 'react';
import { Link } from 'react-router-dom';

interface HomeNavigationButtonsProps {
  currentOffset: number;
  setOffset: (offset: number) => void;
}

interface DetailNavigationButtonsProps {
  prevId: number;
  nextId: number;
}

export const HomeNavigationButtons: FC<HomeNavigationButtonsProps> = ({
  currentOffset,
  setOffset,
}) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        type="button"
        onClick={() => setOffset(currentOffset - 20)}
        disabled={currentOffset === 0}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300"
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
      <span id="navSpan" className="text-lg font-bold">
        {currentOffset + 1} - {currentOffset + 20}
      </span>
      <button
        type="button"
        onClick={() => setOffset(currentOffset + 20)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300"
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

export const DetailNavigationButtons: FC<DetailNavigationButtonsProps> = ({
  prevId,
  nextId,
}) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      {prevId >= 1 && (
        <Link
          to={`/pokemon/${prevId}`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300"
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
        </Link>
      )}
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300"
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
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </Link>
      <Link
        to={`/pokemon/${nextId}`}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300"
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
      </Link>
    </div>
  );
};
