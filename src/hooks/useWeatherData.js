import { useReducer, useCallback, useRef } from "react";
import { getWeatherForecast as getWeatherForecastAPI } from "../utils/api";
import { getWeatherForecast as getWeatherForecastMock } from "../utils/mockApi";
import { getDailyAverages } from "../utils/statsUtils";

export const FETCH_WEATHER = "FETCH_WEATHER";
export const CHANGE_CITY = "CHANGE_CITY";
export const TOGGLE_UNIT = "TOGGLE_UNIT";
export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";

const initialState = {
  city: "London",
  unit: "metric",
  weather: null,
  forecast: [],
  rawData: [],
  loading: false,
  error: null,
  useMock: false,
};

function weatherReducer(state, action) {
  switch (action.type) {
    case FETCH_WEATHER:
      return { ...state, loading: true, error: null };
    case CHANGE_CITY:
      return { ...state, city: action.payload, loading: true, error: null };
    case TOGGLE_UNIT:
      return {
        ...state,
        unit: state.unit === "metric" ? "imperial" : "metric",
        loading: true,
        error: null,
      };
    case SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case CLEAR_ERROR:
      return { ...state, error: null };
    case "SET_WEATHER":
      return {
        ...state,
        weather: action.payload.weather,
        forecast: action.payload.forecast,
        rawData: action.payload.rawData,
        loading: false,
        error: null,
      };
    case "TOGGLE_MOCK":
      return { ...state, useMock: !state.useMock, loading: true };
    default:
      return state;
  }
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function useWeatherData() {
  const [state, dispatch] = useReducer(weatherReducer, initialState);
  const apiKey = import.meta.env.VITE_OWM_API_KEY;
  const lastCity = useRef(state.city);
  const lastUnit = useRef(state.unit);

  const fetchWeather = useCallback(
    async (city = state.city, unit = state.unit, useMock = state.useMock) => {
      dispatch({ type: FETCH_WEATHER });
      try {
        let data;
        if (useMock) {
          data = await getWeatherForecastMock(city);
        } else {
          data = await getWeatherForecastAPI(city, apiKey, unit);
        }
        let forecastList = [];

        if (data.list) {
          forecastList = data.list;
        } else if (data.forecast) {
          forecastList = data.forecast.map((f) => ({
            dt_txt: f.date + " 12:00:00",
            main: { temp: f.temp },
            weather: [{ description: f.weather }],
          }));
        }
        const daily = getDailyAverages(forecastList);
        let current = {};
        if (data.list && data.list.length > 0) {
          current = {
            temp: data.list[0].main?.temp ?? 0,
            weather: data.list[0].weather?.[0]?.description || "",
            date: data.list[0].dt_txt || "",
          };
        }
        dispatch({
          type: "SET_WEATHER",
          payload: {
            weather: current,
            forecast: daily,
            rawData: data.list || forecastList || [],
          },
        });
      } catch (err) {
        dispatch({ type: SET_ERROR, payload: err.message });
      }
    },
    [apiKey, state.useMock, state.unit, state.city]
  );

  const debouncedChangeCity = useRef(
    debounce((city) => {
      dispatch({ type: CHANGE_CITY, payload: city });
      fetchWeather(city, state.unit, state.useMock);
    }, 300)
  ).current;

  const toggleUnit = () => {
    dispatch({ type: TOGGLE_UNIT });
    fetchWeather(
      state.city,
      state.unit === "metric" ? "imperial" : "metric",
      state.useMock
    );
  };

  const toggleMock = () => {
    dispatch({ type: "TOGGLE_MOCK" });
    fetchWeather(state.city, state.unit, !state.useMock);
  };

  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return {
    state,
    dispatch,
    fetchWeather,
    changeCity: debouncedChangeCity,
    toggleUnit,
    toggleMock,
    clearError,
  };
}
