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
  if (!desc) return <WiDaySunny />;
  const d = desc.toLowerCase();
  if (d.includes("quyosh")) return <WiDaySunny />;
  if (d.includes("bulut")) return <WiCloudy />;
  if (d.includes("yomg'ir")) return <WiRain />;
  if (d.includes("qisman")) return <WiDayCloudy />;
  if (d.includes("momaqaldiroq")) return <WiThunderstorm />;
  if (d.includes("qor")) return <WiSnow />;
  if (d.includes("tuman")) return <WiFog />;
  return <WiDaySunny />;
}

const WeatherDisplay = ({ city, weather, unit, loading, error }) => {
  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto self-center bg-white dark:bg-[#212529] rounded-2xl p-4 md:p-8 min-h-[140px] md:min-h-[180px] flex flex-col items-center justify-center border border-gray-200 dark:border-gray-600" />
    );
  }
  if (error) {
    return (
      <div className="w-full max-w-md mx-auto self-center bg-white dark:bg-[#212529] rounded-2xl p-4 md:p-8 min-h-[140px] md:min-h-[180px] flex flex-col items-center justify-center text-red-500 border border-gray-200 dark:border-gray-600">
        {error}
      </div>
    );
  }
  if (!weather) return null;
  const desc = weather.weather ?? "";
  const temp = weather.temp ?? 0;
  const date = weather.date ?? "";

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

  const displayTemp = convertTemp(temp, "metric", unit);

  return (
    <div className="w-full max-w-md mx-auto self-center bg-white dark:bg-[#212529] rounded-2xl p-4 md:p-8 flex flex-col items-center gap-2 md:gap-3 min-h-[140px] md:min-h-[180px] border border-gray-200 dark:border-gray-600">
      <div className="text-[#0d6efd] text-4xl md:text-6xl mb-1 md:mb-2">
        {getWeatherIcon(desc)}
      </div>
      <div className="text-3xl md:text-4xl font-extrabold text-[#212529] dark:text-[#f8f9fa] tracking-tight mb-1">
        {Math.round(displayTemp)}
        {unit === "imperial" ? "°F" : "°C"}
      </div>
      <div className="text-base md:text-lg text-[#212529] dark:text-[#f8f9fa] font-medium mb-1 capitalize">
        {desc}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {city} · {date}
      </div>
    </div>
  );
};

export default WeatherDisplay;
