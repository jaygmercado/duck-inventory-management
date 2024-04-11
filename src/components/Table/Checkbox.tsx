import React, { HTMLProps, MutableRefObject } from 'react';

interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  indeterminate: boolean;
  rowId: string;
  header?: boolean;
}
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ indeterminate, rowId, header, ...rest }, ref) => {
    const defaultRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef = (ref as MutableRefObject<HTMLInputElement>) || defaultRef;

    React.useEffect(() => {
      if (resolvedRef) resolvedRef.current.indeterminate = !!indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <div className="flex items-center h-5">
        <input
          id={`hs-table-pagination-checkbox-${rowId}`}
          className={header ? 'border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800' : 'border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800'}
          type="checkbox"
          ref={resolvedRef}
          {...rest}
        />
        <label htmlFor={`hs-table-pagination-checkbox-${rowId}`} className="sr-only">Checkbox</label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
