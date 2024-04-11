import React from 'react'

interface PaginationControlProps {
  pageIndex: number;
  pageCount: number;
  // eslint-disable-next-line no-unused-vars
  setPageIndex: (pageIndex: number) => void;
  goToPreviousPage: () => void;
  canPreviousPage: boolean;
  goToNextPage: () => void;
  canNextPage: boolean;
  offset?: number;
}
const PaginationControls: React.FC<PaginationControlProps> = ({
  pageIndex,
  pageCount,
  setPageIndex,
  goToPreviousPage,
  canPreviousPage,
  goToNextPage,
  canNextPage,
  offset = 1
}) => {

  return (
    <div className="flex justify-center py-4 px-4 select-none">
      <nav className="flex items-center space-x-2">
        <button
          onClick={() => setPageIndex(0)}
          disabled={!canPreviousPage}
          className="disabled:text-transparent text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md">
          <span aria-hidden="true">«</span>
          <span className="sr-only">Previous</span>
        </button>
        <button
          onClick={goToPreviousPage}
          disabled={!canPreviousPage}
          className="disabled:text-transparent text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md">
          <span aria-hidden="true">‹</span>
          <span className="sr-only">Previous</span>
        </button>

        {arrayRange(1, pageCount, 1)
          .filter(item => {
            if (item >= pageIndex + 1 - offset && item <= pageIndex + 1 + offset) return true
            return false
          })
          .map((pageNum) => {
            const activeClass = 'w-10 h-10 bg-blue-500 text-white p-4 inline-flex items-center text-sm font-medium rounded-full'
            const defaultClass = 'w-10 h-10 text-gray-400 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full'
            return (<button onClick={() => setPageIndex(pageNum - 1)} key={pageNum} className={pageNum - 1 === pageIndex ? activeClass : defaultClass}>{pageNum}</button>)
          })}

        <button
          onClick={goToNextPage}
          disabled={!canNextPage}
          className="disabled:text-transparent text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md">
          <span className="sr-only">Next</span>
          <span aria-hidden="true">›</span>
        </button>
        <button
          onClick={() => setPageIndex(pageCount - 1)}
          disabled={!canNextPage}
          className="disabled:text-transparent text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md">
          <span className="sr-only">Next</span>
          <span aria-hidden="true">»</span>
        </button>
      </nav>
    </div>
  )
}


const arrayRange = (start: number, stop: number, step: number) => {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );
}


export default PaginationControls