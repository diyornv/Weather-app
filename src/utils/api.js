export async function getWeatherForecast(city, _apiKey, unit = 'metric') {
  const apiKey = import.meta.env.VITE_OWM_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${unit}&lang=uz`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("Shahar topilmadi");
      }
      throw new Error("Ob-havo ma'lumotini olishda xatolik");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message || "Tarmoq xatoligi");
  }
}
