import React from "react";
import { render } from "@testing-library/react";
import WeatherDisplay from "../components/WeatherDisplay";

describe("WeatherDisplay", () => {
  const mockWeather = {
    temp: 25,
    weather: "Clear Sky",
    date: "2024-07-26 15:00:00",
  };

  test("should render loading state correctly", () => {
    const { container } = render(
      <WeatherDisplay
        city="London"
        weather={null}
        unit="metric"
        loading={true}
        error={null}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render error state correctly", () => {
    const { container } = render(
      <WeatherDisplay
        city="London"
        weather={null}
        unit="metric"
        loading={false}
        error="City not found"
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render weather data correctly in Celsius", () => {
    const { container } = render(
      <WeatherDisplay
        city="London"
        weather={mockWeather}
        unit="metric"
        loading={false}
        error={null}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render weather data correctly in Fahrenheit", () => {
    const { container } = render(
      <WeatherDisplay
        city="London"
        weather={mockWeather}
        unit="imperial"
        loading={false}
        error={null}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render with null weather data", () => {
    const { container } = render(
      <WeatherDisplay
        city="London"
        weather={null}
        unit="metric"
        loading={false}
        error={null}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("should display correct temperature in Celsius", () => {
    const { getByText } = render(
      <WeatherDisplay
        city="London"
        weather={mockWeather}
        unit="metric"
        loading={false}
        error={null}
      />
    );

    expect(getByText("25°C")).toBeInTheDocument();
  });

  test("should display correct temperature in Fahrenheit", () => {
    const { getByText } = render(
      <WeatherDisplay
        city="London"
        weather={mockWeather}
        unit="imperial"
        loading={false}
        error={null}
      />
    );

    expect(getByText("77°F")).toBeInTheDocument();
  });

  test("should display city and date information", () => {
    const { getByText } = render(
      <WeatherDisplay
        city="London"
        weather={mockWeather}
        unit="metric"
        loading={false}
        error={null}
      />
    );

    expect(getByText("London · 2024-07-26 15:00:00")).toBeInTheDocument();
  });

  test("should display weather description", () => {
    const { getByText } = render(
      <WeatherDisplay
        city="London"
        weather={mockWeather}
        unit="metric"
        loading={false}
        error={null}
      />
    );

    expect(getByText("Clear Sky")).toBeInTheDocument();
  });
});
