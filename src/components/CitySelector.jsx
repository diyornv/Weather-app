import React from "react";

const CITIES = ["London", "New York", "Tokyo", "Sydney", "Cairo"];

const CitySelector = () => {
  return (
    <div className="w-full max-w-xs mx-auto">
      <label htmlFor="city-search" className="block mb-2 text-sm font-medium text-[#212529]">
        Shahar tanlang
      </label>
      <input
        id="city-search"
        type="text"
        placeholder="Qidiruv..."
        className="w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-2 focus:ring-[#0d6efd] bg-white text-[#212529]"
        disabled
      />
      <ul className="border border-t-0 border-gray-300 rounded-b-md bg-white divide-y divide-gray-100">
        {CITIES.map((city) => (
          <li
            key={city}
            className="px-3 py-2 cursor-pointer hover:bg-[#0d6efd]/10 text-[#212529]"
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySelector;
