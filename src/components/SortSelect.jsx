function SortSelect({ filter, handleSortChange, options, title = 'Ordenar' }) {
  return (
    <div className="mb-3 xl:w-64">
      <label
        htmlFor="small"
        className="block mt-5 mb-3 text-sm font-medium text-gray-900 dark:text-white"
      >
        {title}
      </label>
      <select
        id="small"
        className="block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg xl:mb-0 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleSortChange}
        value={filter}
      >
        {options.map((option, index) => {
          return (
            <option
              value={option.value}
              defaultValue={index === 0}
              key={crypto.randomUUID()}
            >
              {option.text}
            </option>
          )
        })}
        {/* <option defaultValue value="all">
            Nombre
          </option>
          <option value="surface">Superficie</option>
          <option value="ngc">Objetos NGC</option>
          <option value="caldwell">Objetos Caldwell</option> */}
      </select>
    </div>
  )
}

export default SortSelect
