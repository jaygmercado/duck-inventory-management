interface SearchBarProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (searchKey: string) => void;
  placeholder?: string;
}
const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className="py-3 px-4">
      <div className="relative max-w-xs">
        <label htmlFor="hs-table-with-pagination-search" className="sr-only">Search</label>
        <input
          type="text" id="hs-table-with-pagination-search"
          className="p-3 pl-10 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
          onChange={e => onChange(e.target.value)}
          value={value}
          placeholder={placeholder} />
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
          <svg className="h-3.5 w-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default SearchBar;