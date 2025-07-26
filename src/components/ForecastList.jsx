import React from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiDayCloudy,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from "react-icons/wi";

function getWeatherIcon(desc) {
  const d = desc.toLowerCase();
  if (d.includes("sunny") || d.includes("clear")) return <WiDaySunny />;
  if (d.includes("cloudy") || d.includes("overcast")) return <WiCloudy />;
  if (d.includes("rain") || d.includes("drizzle")) return <WiRain />;
  if (d.includes("partly") || d.includes("scattered")) return <WiDayCloudy />;
  if (d.includes("thunderstorm") || d.includes("storm"))
    return <WiThunderstorm />;
  if (d.includes("snow")) return <WiSnow />;
  if (d.includes("fog") || d.includes("mist")) return <WiFog />;
  return <WiDaySunny />;
}

const ForecastList = ({ forecast, loading, unit }) => {
  const convertTemp = (temp, fromUnit, toUnit) => {
    if (fromUnit === toUnit) return temp;
    if (fromUnit === "metric" && toUnit === "imperial") {
      return (temp * 9) / 5 + 32;
    }
    if (fromUnit === "imperial" && toUnit === "metric") {
      return ((temp - 32) * 5) / 9;
    }
    return temp;
  };

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 p-2 md:p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-16 md:h-32 bg-gray-200 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm"
          />
        ))}
      </div>
    );
  }
  if (!forecast || forecast.length === 0) return null;
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-base md:text-xl font-semibold text-[#212529] dark:text-[#f8f9fa] mb-2 md:mb-3">
        5-day forecast
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 p-2 md:p-4">
        {forecast.map((item, i) => {
          const displayTemp = convertTemp(item.temp, "metric", unit);
          return (
            <div
              key={item.date || i}
              className="flex flex-col items-center bg-white dark:bg-[#212529] rounded-lg p-2 md:p-4 h-16 md:h-32 border border-gray-200 dark:border-gray-600 shadow-sm"
            >
              <div className="text-base md:text-2xl text-[#0d6efd] mb-1 md:mb-2">
                {getWeatherIcon(item.weather || "")}
              </div>
              <div className="text-xs md:text-lg font-bold text-[#212529] dark:text-[#f8f9fa]">
                {Math.round(displayTemp)}
                {unit === "imperial" ? "°F" : "°C"}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {item.date}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastList;
