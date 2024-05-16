import { useEffect, useMemo, useState } from 'react';
import TableRow from './TableRow';
import SearchBar from '../SearchBar';
import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import PaginationControls from './PaginationControls';
import DeleteModal from './DeleteModal';

interface ITableProps<T extends { _id: string }> {
  DATA: T[];
  COLUMNS: ColumnDef<T>[];
  itemClass: string;
}

const Table = <T extends { _id: string }>({ DATA, COLUMNS, itemClass }: ITableProps<T>) => {
  const columns = useMemo(() => COLUMNS, [COLUMNS]);
  const data = useMemo(() => DATA, [DATA]);

  const [filtering, setFiltering] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [paginationState, setPaginationState] = useState({ pageIndex: 0, pageSize: 3 });
  const [rowSelection, setRowSelection] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Initialize table props from react table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter: filtering,
      sorting: sorting,
      pagination: paginationState,
      rowSelection,
    },
    autoResetPageIndex: false,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setFiltering,
    onSortingChange: setSorting,
    onPaginationChange: setPaginationState,
  });

  useEffect(() => {
    if (paginationState.pageIndex + 1 > table.getPageCount())
      table.setPageIndex(table.getPageCount() - 1);
  }, [paginationState.pageIndex, table]);

  return (
    <>
      <div className='px-6 py-3 flex justify-between items-center space-x-4'>
        <SearchBar placeholder='Search' value={filtering} onChange={setFiltering} />
        <div className='flex items-center space-x-5 pr-3'>
          <div>
            <select
              value={paginationState.pageSize}
              onChange={(e) => table.setPageSize(parseInt(e.target.value))}
              id='hs-select-label'
              className='py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
            >
              {[1, 3, 5, 10, 15, 20, 25, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className='overflow-hidden'>
        {/* ============================== Main table ============================== */}
        <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
          {/* +++++++++++++++++++++ Table Header +++++++++++++++++++++ */}
          <thead className='bg-gray-50 dark:bg-gray-700'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase'
                    key={header.id}
                  >
                    <div
                      className='flex justify-between select-none'
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() &&
                        ({
                          asc: <SortAsc />,
                          desc: <SortDesc />,
                        }[header.column.getIsSorted() as string] ?? <SortDefault />)}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* +++++++++++++++++++++ Table Body +++++++++++++++++++++ */}
          <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.original._id} row={row} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <PaginationControls
        pageIndex={paginationState.pageIndex}
        pageCount={table.getPageCount()}
        setPageIndex={(pageIndex: number) => table.setPageIndex(pageIndex)}
        goToPreviousPage={table.previousPage}
        canPreviousPage={table.getCanPreviousPage()}
        goToNextPage={table.nextPage}
        canNextPage={table.getCanNextPage()}
      />

      {showModal && (
        <DeleteModal
          itemClass={itemClass}
          onClose={() => setShowModal(false)}
          items={table.getSelectedRowModel().flatRows}
          onConfirm={() => setShowModal(false)}
        />
      )}
    </>
  );
};

// ======================== Icons ========================
const SortDefault = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 320 512'>
      <path d='M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z' />
    </svg>
  );
};

const SortAsc = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 320 512'>
      <path d='M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z' />
    </svg>
  );
};

const SortDesc = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 320 512'>
      <path d='M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z' />
    </svg>
  );
};

export default Table;
