import { Row, flexRender } from '@tanstack/react-table';

interface ITableProps<T extends object> {
  row: Row<T>;
}

const TableRow = <T extends object>({
  row,
}: ITableProps<T>) => {
  return (
    <tr>
      {row.getVisibleCells().map((cell) => {
        return (
          <td key={cell.id} className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
};


export default TableRow;
