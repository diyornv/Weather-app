// Mock weather data for 5 cities
const MOCK_DATA = {
  London: {
    city: "London",
    current: {
      temp: 19,
      weather: "Yengil yomg'ir",
      icon: "🌦️",
      date: "2024-07-10 15:00",
    },
    forecast: [
      { date: "2024-07-11", temp: 20, icon: "🌤️", weather: "Bulutli" },
      { date: "2024-07-12", temp: 18, icon: "🌧️", weather: "Yomg'ir" },
      { date: "2024-07-13", temp: 21, icon: "⛅", weather: "Qisman quyoshli" },
      { date: "2024-07-14", temp: 22, icon: "☀️", weather: "Quyoshli" },
      { date: "2024-07-15", temp: 19, icon: "🌦️", weather: "Yengil yomg'ir" },
    ],
  },
  "New York": {
    city: "New York",
    current: {
      temp: 27,
      weather: "Quyoshli",
      icon: "☀️",
      date: "2024-07-10 10:00",
    },
    forecast: [
      { date: "2024-07-11", temp: 28, icon: "☀️", weather: "Quyoshli" },
      { date: "2024-07-12", temp: 26, icon: "⛅", weather: "Qisman quyoshli" },
      { date: "2024-07-13", temp: 25, icon: "🌦️", weather: "Yengil yomg'ir" },
      { date: "2024-07-14", temp: 27, icon: "☀️", weather: "Quyoshli" },
      { date: "2024-07-15", temp: 24, icon: "🌧️", weather: "Yomg'ir" },
    ],
  },
  Tokyo: {
    city: "Tokyo",
    current: {
      temp: 30,
      weather: "Nam va issiq",
      icon: "🌞",
      date: "2024-07-10 22:00",
    },
    forecast: [
      { date: "2024-07-11", temp: 31, icon: "🌞", weather: "Quyoshli" },
      { date: "2024-07-12", temp: 29, icon: "🌦️", weather: "Yengil yomg'ir" },
      { date: "2024-07-13", temp: 28, icon: "⛅", weather: "Qisman quyoshli" },
      { date: "2024-07-14", temp: 32, icon: "☀️", weather: "Quyoshli" },
      { date: "2024-07-15", temp: 30, icon: "🌞", weather: "Quyoshli" },
    ],
  },
  Sydney: {
    city: "Sydney",
    current: {
      temp: 16,
      weather: "Salqin va bulutli",
      icon: "🌥️",
      date: "2024-07-10 18:00",
    },
    forecast: [
      { date: "2024-07-11", temp: 17, icon: "🌥️", weather: "Bulutli" },
      { date: "2024-07-12", temp: 15, icon: "🌧️", weather: "Yomg'ir" },
      { date: "2024-07-13", temp: 16, icon: "⛅", weather: "Qisman quyoshli" },
      { date: "2024-07-14", temp: 18, icon: "☀️", weather: "Quyoshli" },
      { date: "2024-07-15", temp: 16, icon: "🌥️", weather: "Bulutli" },
    ],
  },
  Cairo: {
    city: "Cairo",
    current: {
      temp: 35,
      weather: "Juda issiq",
      icon: "🌡️",
      date: "2024-07-10 14:00",
    },
    forecast: [
      { date: "2024-07-11", temp: 36, icon: "🌡️", weather: "Juda issiq" },
      { date: "2024-07-12", temp: 34, icon: "☀️", weather: "Quyoshli" },
      { date: "2024-07-13", temp: 33, icon: "⛅", weather: "Qisman quyoshli" },
      { date: "2024-07-14", temp: 35, icon: "☀️", weather: "Quyoshli" },
      { date: "2024-07-15", temp: 32, icon: "☀️", weather: "Quyoshli" },
    ],
  },
};

export function getWeatherForecast(city) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (MOCK_DATA[city]) {
        resolve(MOCK_DATA[city]);
      } else {
        reject(new Error("City not found"));
      }
    }, 500); // 500ms delay for realism
  });
}
