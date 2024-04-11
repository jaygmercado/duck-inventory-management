import React, { useEffect, useState } from 'react';
import Item from './Item';

interface MultipleSelectProps {
  items: string[];
  value: string[];
  // eslint-disable-next-line no-unused-vars
  onSelected?: (selected: string[]) => void;
}
const MultipleSelect: React.FC<MultipleSelectProps> = ({ items, value, onSelected }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(value as string[]);
  const [displayItems, setDisplayItems] = useState(false);
  const options = items.filter((item) => !selectedItems.includes(item));

  useEffect(() => {
    setSelectedItems(value as string[]);
  }, [value]);

  useEffect(() => {
    onSelected && onSelected(selectedItems);
  }, [onSelected, selectedItems]);

  return (
    <div className='relative'>
      <div className='flex border rounded-md px-2 py-3'>
        <div className='flex gap-2 w-[23rem] flex-wrap'>
          {selectedItems.map((item, indx) => (
            <Item
              key={indx}
              name={item}
              onClose={() =>
                setSelectedItems((state) => state.filter((selectedItem) => selectedItem != item))
              }
            />
          ))}
        </div>
        <button type='button' className='mr-2' onClick={() => setDisplayItems((state) => !state)}>
          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 320 512'>
            <path d='M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z' />
          </svg>
        </button>
      </div>
      {displayItems && options.length > 0 && (
        <div className='absolute bg-white top-full drop-shadow w-[25rem] space-y-2 overflow-auto p-1 border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'>
          {options.map((item) => (
            <button
              className='block hover:bg-gray-200 w-full text-left px-3 py-2'
              key={item}
              onClick={() => setSelectedItems((state) => [...state, item])}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultipleSelect;
