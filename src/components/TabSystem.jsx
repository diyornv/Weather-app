import React, { useState, useEffect } from "react";

const TABS = [
  { key: "current", label: "Current Weather" },
  { key: "forecast", label: "Forecast" },
  { key: "stats", label: "Statistics" },
  { key: "settings", label: "Settings" },
];

const TabSystem = ({ current, forecast, statistics, settings }) => {
  const [active, setActive] = useState("current");
  const [isVisible, setIsVisible] = useState(true);

  const handleTabChange = (newTab) => {
    if (newTab !== active) {
      setIsVisible(false);
      setTimeout(() => {
        setActive(newTab);
        setIsVisible(true);
      }, 150);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-1 mb-3 overflow-x-auto scrollbar-none">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`shrink-0 px-2 py-1 md:px-4 md:py-2 rounded-t-md font-medium md:font-semibold text-xs md:text-base border-b-2 transition-colors duration-200 ${
              active === tab.key
                ? "border-[#0d6efd] text-[#0d6efd] bg-white dark:bg-[#212529]"
                : "border-transparent text-[#212529] dark:text-[#f8f9fa] bg-gray-100 dark:bg-[#212529] hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="relative min-h-[250px] md:min-h-[350px] p-2 md:p-4">
        <div
          key={active}
          className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {active === "current" && current}
          {active === "forecast" && forecast}
          {active === "stats" && statistics}
          {active === "settings" && settings}
        </div>
      </div>
    </div>
  );
};

export default TabSystem;
