import React from "react";
import { FaCog, FaThermometerHalf } from "react-icons/fa";
import { FaRotate } from "react-icons/fa6";

const SettingsPanel = ({
  unit,
  onToggleUnit,
  onRefresh,
  isMockEnabled,
  onToggleMock,
  loading = false,
}) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-[#212529] rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
      <div className="flex items-center gap-2 mb-4">
        <FaCog className="text-[#0d6efd] text-xl" />
        <h3 className="text-lg font-semibold text-[#212529] dark:text-[#f8f9fa]">
          Settings
        </h3>
      </div>

      <div className="space-y-4">
        {/* Temperatura birliklari */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2">
            <FaThermometerHalf className="text-[#0d6efd]" />
            <span className="text-[#212529] dark:text-[#f8f9fa] font-medium">
              Temperature unit
            </span>
          </div>
          <button
            onClick={onToggleUnit}
            className="px-3 py-1 bg-[#0d6efd] text-white rounded-md text-sm font-semibold hover:bg-[#0b5ed7] transition"
          >
            {unit === "metric" ? "°C" : "°F"}
          </button>
        </div>

        {/* Yangilash */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2">
            <FaRotate className="text-[#0d6efd]" />
            <span className="text-[#212529] dark:text-[#f8f9fa] font-medium">
              Refresh data
            </span>
          </div>
          <button
            onClick={onRefresh}
            disabled={loading}
            className={`px-3 py-1 rounded-md text-sm font-semibold transition flex items-center gap-1 ${
              loading
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-[#0d6efd] text-white hover:bg-[#0b5ed7]"
            }`}
          >
            <FaRotate className={`text-xs ${loading ? "animate-spin" : ""}`} />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
