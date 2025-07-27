import React from "react";
import { getWeatherStats } from "../utils/statsUtils";

const DataVisualization = ({ data, loading, unit = "metric" }) => {
  if (loading) {
    return (
      <div className="w-full bg-white dark:bg-[#212529] rounded-xl shadow-md p-4 md:p-6 border border-gray-200 dark:border-gray-600">
        <h2 className="text-lg md:text-xl font-semibold text-[#212529] dark:text-[#f8f9fa] mb-3 text-center">
          Temperature graph (36 hours)
        </h2>
        <div className="w-full h-44 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full bg-white dark:bg-[#212529] rounded-xl shadow-md p-4 md:p-6 border border-gray-200 dark:border-gray-600">
        <h2 className="text-lg md:text-xl font-semibold text-[#212529] dark:text-[#f8f9fa] mb-3 text-center">
          Temperature graph (36 hours)
        </h2>
        <div className="w-full h-44 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
          No data available
        </div>
      </div>
    );
  }

  let chartData = [];

  if (Array.isArray(data) && data.length > 0 && data[0].dt_txt) {
    chartData = data.slice(0, 12).map((item, index) => {
      const date = new Date(item.dt_txt);
      const time = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      return {
        time: time,
        temp: item.main?.temp || 0,
        humidity: item.main?.humidity || 0,
        pressure: item.main?.pressure || 0,
        description: item.weather?.[0]?.description || "",
      };
    });
  }

  if (chartData.length === 0) {
    return (
      <div className="w-full bg-white dark:bg-[#212529] rounded-xl shadow-md p-4 md:p-6 border border-gray-200 dark:border-gray-600">
        <h2 className="text-lg md:text-xl font-semibold text-[#212529] dark:text-[#f8f9fa] mb-3 text-center">
          Temperature graph (36 hours)
        </h2>
        <div className="w-full h-44 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
          No data available
        </div>
      </div>
    );
  }

  const temps = chartData.map((d) => d.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const tempRange = maxTemp - minTemp || 1;

  const tempUnit = unit === "imperial" ? "°F" : "°C";

  // Chart layout variables
  const chartHeight = 44; // Tailwind h-44
  const svgHeight = 65; // px, more vertical space
  const chartTop = 10; // px, top padding for chart
  const chartBottom = 20; // px, bottom padding before time labels
  const gridLines = 5;
  const chartAreaHeight = svgHeight - chartTop - chartBottom; // area for chart

  return (
    <div className="w-full bg-white dark:bg-[#212529] rounded-xl shadow-md p-4 md:p-6 border border-gray-200 dark:border-gray-600">
      <h2 className="text-lg md:text-xl font-semibold text-[#212529] dark:text-[#f8f9fa] mb-3 text-center">
        Temperature graph (36 hours)
      </h2>

      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-3 md:mb-4 text-center">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">Min</div>
          <div className="text-lg font-bold text-[#0d6efd]">
            {Math.round(minTemp)}
            {tempUnit}
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Average
          </div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            {Math.round(temps.reduce((a, b) => a + b, 0) / temps.length)}
            {tempUnit}
          </div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">Max</div>
          <div className="text-lg font-bold text-red-600 dark:text-red-400">
            {Math.round(maxTemp)}
            {tempUnit}
          </div>
        </div>
      </div>

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

      <div className="w-full">
        <svg
          className="w-full h-44"
          viewBox={`0 0 360 ${svgHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {[...Array(gridLines)].map((_, i) => {
            const y = chartTop + i * (chartAreaHeight / (gridLines - 1));
            return (
              <line
                key={i}
                x1="10"
                y1={y}
                x2="350"
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1.5"
                className="dark:stroke-gray-600"
              />
            );
          })}

          <polyline
            fill="none"
            stroke="#0d6efd"
            strokeWidth="3"
            points={chartData
              .map((d, i) => {
                const x = 10 + i * ((360 - 2 * 10) / (chartData.length - 1));
                const y =
                  chartTop +
                  chartAreaHeight -
                  ((d.temp - minTemp) / tempRange) * chartAreaHeight;
                return `${x},${y}`;
              })
              .join(" ")}
            className="transition-all duration-300"
          />

          {chartData.map((d, i) => {
            const x = 10 + i * ((360 - 2 * 10) / (chartData.length - 1));
            const y =
              chartTop +
              chartAreaHeight -
              ((d.temp - minTemp) / tempRange) * chartAreaHeight;
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="#0d6efd"
                  className="transition-all duration-300 hover:r-8"
                />
                <text
                  x={x}
                  y={y - 8}
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
            const x = 10 + i * ((360 - 2 * 10) / (chartData.length - 1));
            return (
              <text
                key={i}
                x={x}
                y={svgHeight - 2}
                textAnchor="middle"
                fontSize="8"
                fill="#6b7280"
                className="dark:fill-gray-400"
                style={{ dominantBaseline: "hanging" }}
              >
                {d.time}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default DataVisualization;
