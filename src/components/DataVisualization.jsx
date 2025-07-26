import React from "react";
import { getWeatherStats, getDetailedDailyAverages } from "../utils/statsUtils";

const WIDTH = 320;
const HEIGHT = 100;
const PADDING = 20;

const DataVisualization = ({ data, loading, unit = "metric" }) => {
  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto bg-white dark:bg-[#212529] rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-600">
        <h2 className="text-xl font-semibold text-[#212529] dark:text-[#f8f9fa] mb-3">
          Harorat grafigi
        </h2>
        <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto bg-white dark:bg-[#212529] rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-600">
        <h2 className="text-xl font-semibold text-[#212529] dark:text-[#f8f9fa] mb-3">
          Temperature graph
        </h2>
        <div className="w-full h-32 flex items-center justify-center text-gray-500 dark:text-gray-400">
          No data available
        </div>
      </div>
    );
  }

  let chartData = [];

  if (Array.isArray(data) && data.length > 0 && data[0].dt_txt) {
    const dailyData = getDetailedDailyAverages(data);
    chartData = dailyData.slice(0, 5).map((item, index) => ({
      date: item.date
        ? item.date.split("-").slice(1).join("-")
        : `Day ${index + 1}`,
      temp: item.temp || 0,
      humidity: item.humidity || 0,
      pressure: item.pressure || 0,
    }));
  } else if (Array.isArray(data)) {
    chartData = data.slice(0, 5).map((item, index) => ({
      date: item.date
        ? item.date.split("-").slice(1).join("-")
        : `Day ${index + 1}`,
      temp: item.temp || 0,
    }));
  }

  if (chartData.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto bg-white dark:bg-[#212529] rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-600">
        <h2 className="text-xl font-semibold text-[#212529] dark:text-[#f8f9fa] mb-3">
          Temperature graph
        </h2>
        <div className="w-full h-32 flex items-center justify-center text-gray-500 dark:text-gray-400">
          No data available
        </div>
      </div>
    );
  }

  const maxTemp = Math.max(...chartData.map((d) => d.temp));
  const minTemp = Math.min(...chartData.map((d) => d.temp));
  const tempRange = maxTemp - minTemp || 1;

  const points = chartData
    .map((d, i) => {
      const x = PADDING + i * ((WIDTH - 2 * PADDING) / (chartData.length - 1));
      const y =
        HEIGHT -
        PADDING -
        ((d.temp - minTemp) / tempRange) * (HEIGHT - 2 * PADDING);
      return `${x},${y}`;
    })
    .join(" ");

  const stats = getWeatherStats(data);

  const tempUnit = unit === "imperial" ? "°F" : "°C";

  return (
    <div className="w-full bg-white dark:bg-[#212529] rounded-xl shadow-md p-4 md:p-6 border border-gray-200 dark:border-gray-600">
      <h2 className="text-xl font-semibold text-[#212529] dark:text-[#f8f9fa] mb-3">
        Temperature graph
      </h2>

      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-3 md:mb-4 text-center">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">Min</div>
          <div className="text-lg font-bold text-[#0d6efd]">
            {stats.min}
            {tempUnit}
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Average
          </div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            {stats.average}
            {tempUnit}
          </div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">Max</div>
          <div className="text-lg font-bold text-red-600 dark:text-red-400">
            {stats.max}
            {tempUnit}
          </div>
        </div>
      </div>

      {chartData[0]?.humidity && (
        <div className="grid grid-cols-2 gap-2 md:gap-4 mb-3 md:mb-4 text-center">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Average humidity
            </div>
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {Math.round(
                chartData.reduce((sum, d) => sum + (d.humidity || 0), 0) /
                  chartData.length
              )}
              %
            </div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Average pressure
            </div>
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
              {Math.round(
                chartData.reduce((sum, d) => sum + (d.pressure || 0), 0) /
                  chartData.length
              )}{" "}
              hPa
            </div>
          </div>
        </div>
      )}

      <svg width={WIDTH} height={HEIGHT} className="w-full h-24">
        {[0, 1, 2, 3, 4].map((i) => {
          const y = PADDING + i * ((HEIGHT - 2 * PADDING) / 4);
          return (
            <line
              key={i}
              x1={PADDING}
              y1={y}
              x2={WIDTH - PADDING}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="1"
              className="dark:stroke-gray-600"
            />
          );
        })}

        <polyline
          fill="none"
          stroke="#0d6efd"
          strokeWidth="3"
          points={points}
          className="transition-all duration-300"
        />

        {chartData.map((d, i) => {
          const x =
            PADDING + i * ((WIDTH - 2 * PADDING) / (chartData.length - 1));
          const y =
            HEIGHT -
            PADDING -
            ((d.temp - minTemp) / tempRange) * (HEIGHT - 2 * PADDING);
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={5}
                fill="#0d6efd"
                className="transition-all duration-300 hover:r-6"
              />
              <text
                x={x}
                y={y - 10}
                textAnchor="middle"
                fontSize="10"
                fill="#0d6efd"
                className="font-semibold"
              >
                {Math.round(d.temp)}
                {tempUnit}
              </text>
            </g>
          );
        })}

        {chartData.map((d, i) => {
          const x =
            PADDING + i * ((WIDTH - 2 * PADDING) / (chartData.length - 1));
          return (
            <text
              key={i}
              x={x}
              y={HEIGHT - 4}
              textAnchor="middle"
              fontSize="11"
              fill="#6b7280"
              className="dark:fill-gray-400"
            >
              {d.date}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default DataVisualization;
