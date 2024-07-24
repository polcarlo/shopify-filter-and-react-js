import React from 'react';

const FilterControls = ({
  filters,
  onFilterChange,
  onColorChange,
  onResetFilters,
  filteredProductCount,
}) => {
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4 border p-4 rounded">
        <select
          name="price"
          onChange={onFilterChange}
          className="p-2 border rounded hover:border-blue-500 bg-white"
        >
          <option value="">Price</option>
          <option value="50">Up to $50</option>
          <option value="100">Up to $100</option>
          <option value="200">Up to $200</option>
          <option value="2000">Up to $2000</option>
        </select>
        <select
          name="type"
          onChange={onFilterChange}
          className="p-2 border rounded hover:border-blue-500"
        >
          <option value="">Product Type</option>
          <option value="Type1">Type1</option>
          <option value="Type2">Type2</option>
        </select>

        <div className="relative w-full md:w-1/5 border">
          <button
            className="border rounded hover:border-blue-500 bg-white flex items-center w-full p-2 justify-between"
            type="button"
            onClick={() =>
              document
                .getElementById('colorDropdown')
                .classList.toggle('hidden')
            }
          >
            Colors
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <div
            id="colorDropdown"
            className="absolute top-12 left-0 w-full bg-white border rounded shadow-lg z-10 hidden"
          >
            <div className="flex justify-between items-center border-b border-gray-300 bg-gray-100 p-2">
              <span>{filters.colors.length} selected</span>
              <button
                type="button"
                onClick={onResetFilters}
                className="text-blue-500 hover:underline"
              >
                Reset
              </button>
            </div>

            <div className="flex flex-col mt-2">
              {['Red', 'Blue', 'Green', 'Yellow'].map((color) => (
                <button
                  key={color}
                  onClick={() => onColorChange(color)}
                  className={`p-2 border hover:border-blue-500 text-left ${
                    filters.colors.includes(color) ? 'bg-blue-100' : ''
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="ml-auto">
          <span className="font-bold">{filteredProductCount} Products</span>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
