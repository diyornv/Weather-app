export function getDailyAverages(forecastList) {
  const days = {};
  forecastList.forEach((item) => {
    const day = item.dt_txt.split(" ")[0];
    if (!days[day]) days[day] = [];
    days[day].push(item.main.temp);
  });
  return Object.entries(days)
    .slice(0, 5)
    .map(([date, temps]) => ({
      date,
      temp: Math.round(temps.reduce((a, b) => a + b, 0) / temps.length),
    }));
}

export function getWeatherStats(forecastList) {
  if (!forecastList || forecastList.length === 0) {
    return { min: 0, max: 0, average: 0 };
  }

  const temps = forecastList.map((item) => item.main.temp);
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const average = temps.reduce((a, b) => a + b, 0) / temps.length;

  return {
    min: Math.round(min),
    max: Math.round(max),
    average: Math.round(average),
  };
}

export function sortWeatherData(forecastList) {
  if (!forecastList || forecastList.length === 0) {
    return [];
  }

  return [...forecastList].sort((a, b) => {
    const dateA = new Date(a.dt_txt);
    const dateB = new Date(b.dt_txt);
    return dateA - dateB;
  });
}

export function getDetailedDailyAverages(forecastList) {
  if (!forecastList || forecastList.length === 0) {
    return [];
  }

  const days = {};

  forecastList.forEach((item) => {
    const day = item.dt_txt.split(" ")[0];
    if (!days[day]) {
      days[day] = {
        temps: [],
        humidity: [],
        pressure: [],
        description: item.weather[0]?.description || "Unknown",
      };
    }

    days[day].temps.push(item.main.temp);
    days[day].humidity.push(item.main.humidity);
    days[day].pressure.push(item.main.pressure);
  });

  return Object.entries(days)
    .slice(0, 5)
    .map(([date, data]) => ({
      date,
      temp: Math.round(
        data.temps.reduce((a, b) => a + b, 0) / data.temps.length
      ),
      humidity: Math.round(
        data.humidity.reduce((a, b) => a + b, 0) / data.humidity.length
      ),
      pressure: Math.round(
        data.pressure.reduce((a, b) => a + b, 0) / data.pressure.length
      ),
      description: data.description,
    }));
}
