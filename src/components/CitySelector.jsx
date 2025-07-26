import React, { useState } from "react";

const CitySelector = ({ currentCity, onChangeCity, error }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      onChangeCity(search.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xs mx-auto flex flex-col gap-2"
    >
      <label
        htmlFor="city-search"
        className="block text-sm font-medium text-[#212529] dark:text-[#f8f9fa]"
      >
        Select city
      </label>
      <input
        id="city-search"
        type="text"
        placeholder="Enter city name..."
        className="w-full rounded-md py-2 px-3 text-base border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#212529] text-[#212529] dark:text-[#f8f9fa] focus:outline-none focus:ring-2 focus:ring-[#0d6efd]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoComplete="off"
      />
      <button
        type="submit"
        className="w-full py-2 rounded font-semibold bg-[#0d6efd] text-white hover:bg-[#0b5ed7] transition"
      >
        Search
      </button>
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </form>
  );
};

export default CitySelector;
