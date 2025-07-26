# 🌤️ Weather App

Istalgan shahar uchun ob-havo ma'lumotlarini ko'rsatadi. OpenWeatherMap API va mock service yordamida ishlaydi.

## ✨ Xususiyatlar

- 🌍 **Dunyodagi istalgan shahar** uchun ob-havo ma'lumotlari
- 🌡️ **Temperatura birliklari** (°C/°F) o'zgartirish
- 🌙 **Dark/Light mode** qo'llab-quvvatlash
- 📱 **Responsive dizayn** (mobile va desktop)
- 📊 **5 kunlik prognoz** va statistika
- 🎨 **Zamonaviy UI** Tailwind CSS bilan
- 🚀 **Tezkor ishlash** Vite bilan

## 🛠️ Texnologiyalar

- **React 18** - Frontend framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Icons** - Iconlar
- **OpenWeatherMap API** - Ob-havo ma'lumotlari
- **Jest + Testing Library** - Testing

## 📦 O'rnatish

### Talablar

- Node.js 16+
- npm yoki yarn

### Qadamlar

1. **Loyihani klonlash:**

```bash
git clone https://github.com/diyornv/Weather-app.git
cd weather-app
```

2. **Dependencelarni o'rnatish:**

```bash
npm install
```

3. **Environment variable yaratish:**
   `.env` faylini loyiha root papkasida yarating:

```env
VITE_OWM_API_KEY=your_openweathermap_api_key
```

4. **Development server ishga tushirish:**

```bash
npm run dev
```

5. **Brauzerda ochish:**

```
http://localhost:5173
```

## 🔑 API Key olish

1. [OpenWeatherMap](https://openweathermap.org/) ga ro'yxatdan o'ting
2. API Keys bo'limiga o'ting
3. Yangi API key yarating
4. Emailingizni tasdiqlang
5. API keyni `.env` faylga qo'shing

## 📁 Loyiha strukturası

```
src/
├── components/          # React komponentlari
│   ├── WeatherWidget.jsx      # Asosiy container
│   ├── CitySelector.jsx       # Shahar tanlash
│   ├── WeatherDisplay.jsx     # Hozirgi ob-havo
│   ├── ForecastList.jsx       # 5 kunlik prognoz
│   ├── DataVisualization.jsx  # Statistika chizma
│   ├── SettingsPanel.jsx      # Sozlamalar
│   ├── ErrorBoundary.jsx      # Xatolik ushlovchi
│   └── TabSystem.jsx          # Tab navigatsiya
├── hooks/              # Custom hooks
│   └── useWeatherData.js      # Ob-havo ma'lumotlari
├── context/            # React Context
│   └── ThemeContext.jsx       # Dark/Light mode
├── utils/              # Utility funksiyalar
│   ├── api.js                 # OpenWeatherMap API
│   ├── mockApi.js             # Mock service
│   ├── tempUtils.js           # Temperatura konvertatsiya
│   ├── statsUtils.js          # Statistika hisoblash
│   ├── debounce.js            # Debounce funksiya
│   └── throttle.js            # Throttle funksiya
└── tests/              # Test fayllari
    ├── useWeatherData.test.js
    ├── tempUtils.test.js
    ├── debounce.test.js
    └── WeatherDisplay.test.jsx
```

## 🧩 Komponentlar

### WeatherWidget

**Vazifa:** Asosiy container komponent
**Props:** Yo'q
**State:** useWeatherData hook orqali

### CitySelector

**Vazifa:** Shahar qidiruv va tanlash
**Props:**

- `currentCity` - Hozirgi shahar
- `onChangeCity` - Shahar o'zgartirish funksiyasi
- `error` - Xatolik xabari

### WeatherDisplay

**Vazifa:** Hozirgi ob-havo ko'rsatish
**Props:**

- `city` - Shahar nomi
- `weather` - Ob-havo ma'lumotlari
- `unit` - Temperatura birligi
- `loading` - Yuklanish holati
- `error` - Xatolik

### ForecastList

**Vazifa:** 5 kunlik prognoz ko'rsatish
**Props:**

- `forecast` - Prognoz ma'lumotlari
- `loading` - Yuklanish holati
- `unit` - Temperatura birligi

### SettingsPanel

**Vazifa:** Sozlamalar boshqaruvi
**Props:**

- `unit` - Temperatura birligi
- `onToggleUnit` - Birlik o'zgartirish
- `onRefresh` - Yangilash
- `isMockEnabled` - Mock rejimi
- `onToggleMock` - Mock rejimi o'zgartirish
- `loading` - Yuklanish holati

## 🪝 Custom Hooks

### useWeatherData

**Vazifa:** Ob-havo ma'lumotlarini boshqarish
**Qaytaradi:**

- `state` - Hozirgi holat
- `changeCity` - Shahar o'zgartirish
- `toggleUnit` - Temperatura birligi o'zgartirish
- `toggleMock` - Mock rejimi o'zgartirish
- `clearError` - Xatolikni tozalash

**State strukturası:**

```javascript
{
  city: string,
  weather: object | null,
  forecast: array,
  loading: boolean,
  error: string | null,
  unit: 'metric' | 'imperial',
  isMockEnabled: boolean
}
```

## 🔧 Utility Funksiyalar

### tempUtils.js

- `celsiusToFahrenheit(c)` - °C dan °F ga
- `fahrenheitToCelsius(f)` - °F dan °C ga

### statsUtils.js

- `getDailyAverages(forecastList)` - Kunlik o'rtachalar
- `getWeatherStats(forecastList)` - Min/max/average
- `sortWeatherData(forecastList)` - Sana bo'yicha sort
- `getDetailedDailyAverages(forecastList)` - Batafsil kunlik ma'lumotlar

### debounce.js

- `debounce(func, delay)` - Umumiy debounce
- `debouncedSearch(searchFunc)` - Qidiruv uchun debounce

## 🎨 UI/UX Xususiyatlari

### Responsive Dizayn

- **Mobile:** 2 ustunli grid, kichik cardlar
- **Desktop:** 5 ustunli grid, katta cardlar
- **Breakpoint:** 768px (md)

### Dark/Light Mode

- **Light:** `#f8f9fa` fon, `#212529` text, `#0d6efd` accent
- **Dark:** `#212529` fon, `#f8f9fa` text, `#0d6efd` accent
- **Persistence:** localStorage da saqlanadi

### Animatsiyalar

- **Tab o'zgartirish:** Fade in/out (300ms)
- **Theme o'zgartirish:** Smooth transition
- **Loading states:** Skeleton loading

## 🧪 Testing

### Test fayllari

- `useWeatherData.test.js` - Custom hook testi
- `tempUtils.test.js` - Temperatura konvertatsiya
- `debounce.test.js` - Debounce funksiya
- `WeatherDisplay.test.jsx` - Snapshot testi

### Test ishga tushirish

```bash
npm test
```

## 🚀 Performance Optimizatsiyasi

### 1. Code Splitting

- Komponentlar alohida import qilinadi
- Lazy loading qo'llanilgan

### 2. Memoization

- `useCallback` - Funksiyalar uchun
- `useMemo` - Hisoblashlar uchun
- `React.memo` - Komponentlar uchun

### 3. API Optimizatsiyasi

- **Debounce:** Qidiruv input uchun (300ms)
- **Throttle:** API chaqiruvlar uchun (5s)
- **Mock service:** Development uchun

### 4. Bundle Optimizatsiyasi

- **Vite:** Tezkor build va HMR
- **Tree shaking:** Foydalanilmagan kod olib tashlanadi
- **Minification:** Production build

## 🐛 Xatoliklar va yechimlar

### API Xatoliklari

- **401 Unauthorized:** API key noto'g'ri yoki tasdiqlanmagan
- **404 Not Found:** Shahar topilmadi
- **429 Too Many Requests:** API limit oshib ketdi

### UI Xatoliklari

- **ErrorBoundary:** Kutilmagan xatoliklarni ushlaydi
- **Loading states:** Foydalanuvchi tajribasini yaxshilaydi
- **Error messages:** Aniq va tushunarli xabarlar

## 📝 Lisensiya

MIT License - [LICENSE](LICENSE) faylini ko'ring

## 🤝 Hissa qo'shish

1. Fork qiling
2. Feature branch yarating (`git checkout -b feature/amazing-feature`)
3. Commit qiling (`git commit -m 'Add amazing feature'`)
4. Push qiling (`git push origin feature/amazing-feature`)
5. Pull Request yarating

## 📞 Bog'lanish

- **Email:** diyornv@gmail.com
- **GitHub:** [@your-username](https://github.com/diyornv)

---

⭐ Bu loyiha foydali bo'lsa, star bering!
