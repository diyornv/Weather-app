import { renderHook, act } from "@testing-library/react";
import { useWeatherData } from "../hooks/useWeatherData";

// Mock API functions
jest.mock("../utils/api", () => ({
  fetchWeatherData: jest.fn(),
}));

jest.mock("../utils/mockApi", () => ({
  fetchMockWeatherData: jest.fn(),
}));

describe("useWeatherData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should initialize with default state", () => {
    const { result } = renderHook(() => useWeatherData());

    expect(result.current.state).toEqual({
      city: "London",
      weather: null,
      forecast: [],
      loading: false,
      error: null,
      unit: "metric",
      isMockEnabled: true,
    });
  });

  test("should change city", () => {
    const { result } = renderHook(() => useWeatherData());

    act(() => {
      result.current.changeCity("New York");
    });

    expect(result.current.state.city).toBe("New York");
  });

  test("should toggle temperature unit", () => {
    const { result } = renderHook(() => useWeatherData());

    act(() => {
      result.current.toggleUnit();
    });

    expect(result.current.state.unit).toBe("imperial");

    act(() => {
      result.current.toggleUnit();
    });

    expect(result.current.state.unit).toBe("metric");
  });

  test("should toggle mock mode", () => {
    const { result } = renderHook(() => useWeatherData());

    act(() => {
      result.current.toggleMock();
    });

    expect(result.current.state.isMockEnabled).toBe(false);

    act(() => {
      result.current.toggleMock();
    });

    expect(result.current.state.isMockEnabled).toBe(true);
  });

  test("should clear error", () => {
    const { result } = renderHook(() => useWeatherData());

    // Set error first
    act(() => {
      result.current.state.error = "Test error";
    });

    act(() => {
      result.current.clearError();
    });

    expect(result.current.state.error).toBe(null);
  });
});
