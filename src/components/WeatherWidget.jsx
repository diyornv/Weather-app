import React from "react";
import CitySelector from "./CitySelector";
import WeatherDisplay from "./WeatherDisplay";
import ForecastList from "./ForecastList";
import DataVisualization from "./DataVisualization";
import SettingsPanel from "./SettingsPanel";
import TabSystem from "./TabSystem";
import { ThemeSwitch } from "../context/ThemeContext";
import { useWeatherData } from "../hooks/useWeatherData";
import { FaTemperatureHigh } from "react-icons/fa";

const WeatherWidget = () => {
  const { state, changeCity, toggleUnit, toggleMock, clearError } =
    useWeatherData();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8f9fa] dark:bg-[#212529] transition-colors duration-300">
      <div className="w-full max-w-2xl rounded-3xl shadow-2xl bg-[#f8f9fa] dark:bg-[#212529] border-0 md:border md:border-gray-200 dark:md:border-gray-700 p-4 md:p-16 flex flex-col gap-6 md:gap-8 mx-2 my-4 md:my-8">
        <header className="flex items-center justify-between gap-2 mb-2">
          <h1 className="text-xl md:text-4xl font-bold text-[#212529] dark:text-[#f8f9fa] text-center tracking-tight select-none flex-1">
            Weather App
          </h1>
          <div className="flex items-center gap-2">
            <ThemeSwitch />
          </div>
        </header>
        <div className="mb-2">
          <CitySelector
            currentCity={state.city}
            onChangeCity={changeCity}
            error={state.error}
          />
        </div>
        <div className="rounded-2xl bg-[#f8f9fa] dark:bg-[#212529] shadow-inner p-2 md:p-6">
          <TabSystem
            current={
              <WeatherDisplay
                city={state.city}
                weather={state.weather}
                unit={state.unit}
                loading={state.loading}
                error={state.error}
              />
            }
            forecast={
              <ForecastList
                forecast={state.forecast}
                loading={state.loading}
                unit={state.unit}
              />
            }
            statistics={
              <DataVisualization
                data={state.rawData}
                loading={state.loading}
                unit={state.unit}
              />
            }
            settings={
              <SettingsPanel
                unit={state.unit}
                onToggleUnit={toggleUnit}
                onRefresh={() => changeCity(state.city)}
                isMockEnabled={state.isMockEnabled}
                onToggleMock={toggleMock}
                loading={state.loading}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
