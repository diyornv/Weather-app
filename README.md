# 🌤️ Weather App

Shows weather information for any city. Works with OpenWeatherMap API and mock service.

## ✨ Features

- 🌍 **Weather data** for any city in the world
- 🌡️ **Temperature units** (°C/°F) switching
- 🌙 **Dark/Light mode** support
- 📱 **Responsive design** (mobile and desktop)
- 📊 **5-day forecast** and statistics
- 🎨 **Modern UI** with Tailwind CSS
- 🚀 **Fast performance** with Vite

## 🛠️ Technologies

- **React 18** - Frontend framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Icons** - Icons
- **OpenWeatherMap API** - Weather data
- **Jest + Testing Library** - Testing

## 📦 Installation

### Requirements

- Node.js 16+
- npm or yarn

### Steps

1. **Clone the project:**

```bash
git clone https://github.com/diyornv/Weather-app.git
cd weather-app
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create environment variable:**
   Create `.env` file in project root:

```env
VITE_OWM_API_KEY=your_openweathermap_api_key
```

4. **Start development server:**

```bash
npm run dev
```

5. **Open in browser:**

```
http://localhost:5173
```

## 🔑 Get API Key

1. Sign up at [OpenWeatherMap](https://openweathermap.org/)
2. Go to API Keys section
3. Create new API key
4. Confirm your email
5. Add API key to `.env` file

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── WeatherWidget.jsx      # Main container
│   ├── CitySelector.jsx       # City selection
│   ├── WeatherDisplay.jsx     # Current weather
│   ├── ForecastList.jsx       # 5-day forecast
│   ├── DataVisualization.jsx  # Statistics chart
│   ├── SettingsPanel.jsx      # Settings
│   ├── ErrorBoundary.jsx      # Error handler
│   └── TabSystem.jsx          # Tab navigation
├── hooks/              # Custom hooks
│   └── useWeatherData.js      # Weather data
├── context/            # React Context
│   └── ThemeContext.jsx       # Dark/Light mode
├── utils/              # Utility functions
│   ├── api.js                 # OpenWeatherMap API
│   ├── mockApi.js             # Mock service
│   ├── tempUtils.js           # Temperature conversion
│   ├── statsUtils.js          # Statistics calculation
│   ├── debounce.js            # Debounce function
│   └── throttle.js            # Throttle function
└── tests/              # Test files
    ├── useWeatherData.test.js
    ├── tempUtils.test.js
    ├── debounce.test.js
    └── WeatherDisplay.test.jsx
```

## 🧩 Components

### WeatherWidget

**Purpose:** Main container component
**Props:** None
**State:** Through useWeatherData hook

### CitySelector

**Purpose:** City search and selection
**Props:**

- `currentCity` - Current city
- `onChangeCity` - City change function
- `error` - Error message

### WeatherDisplay

**Purpose:** Show current weather
**Props:**

- `city` - City name
- `weather` - Weather data
- `unit` - Temperature unit
- `loading` - Loading state
- `error` - Error

### ForecastList

**Purpose:** Show 5-day forecast
**Props:**

- `forecast` - Forecast data
- `loading` - Loading state
- `unit` - Temperature unit

### SettingsPanel

**Purpose:** Settings management
**Props:**

- `unit` - Temperature unit
- `onToggleUnit` - Unit change
- `onRefresh` - Refresh
- `isMockEnabled` - Mock mode
- `onToggleMock` - Mock mode change
- `loading` - Loading state

## 🪝 Custom Hooks

### useWeatherData

**Purpose:** Manage weather data
**Returns:**

- `state` - Current state
- `changeCity` - Change city
- `toggleUnit` - Toggle temperature unit
- `toggleMock` - Toggle mock mode
- `clearError` - Clear error

**State structure:**

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

## 🔧 Utility Functions

### tempUtils.js

- `celsiusToFahrenheit(c)` - °C to °F
- `fahrenheitToCelsius(f)` - °F to °C

### statsUtils.js

- `getDailyAverages(forecastList)` - Daily averages
- `getWeatherStats(forecastList)` - Min/max/average
- `sortWeatherData(forecastList)` - Sort by date
- `getDetailedDailyAverages(forecastList)` - Detailed daily data

### debounce.js

- `debounce(func, delay)` - General debounce
- `debouncedSearch(searchFunc)` - Search debounce

## 🎨 UI/UX Features

### Responsive Design

- **Mobile:** 2-column grid, small cards
- **Desktop:** 5-column grid, large cards
- **Breakpoint:** 768px (md)

### Dark/Light Mode

- **Light:** `#f8f9fa` background, `#212529` text, `#0d6efd` accent
- **Dark:** `#212529` background, `#f8f9fa` text, `#0d6efd` accent
- **Persistence:** Saved in localStorage

### Animations

- **Tab switching:** Fade in/out (300ms)
- **Theme switching:** Smooth transition
- **Loading states:** Skeleton loading

## 🧪 Testing

### Test files

- `useWeatherData.test.js` - Custom hook test
- `tempUtils.test.js` - Temperature conversion
- `debounce.test.js` - Debounce function
- `WeatherDisplay.test.jsx` - Snapshot test

### Run tests

```bash
npm test
```

## 🚀 Performance Optimization

### 1. Code Splitting

- Components imported separately
- Lazy loading used

### 2. Memoization

- `useCallback` - For functions
- `useMemo` - For calculations
- `React.memo` - For components

### 3. API Optimization

- **Debounce:** For search input (300ms)
- **Throttle:** For API calls (5s)
- **Mock service:** For development

### 4. Bundle Optimization

- **Vite:** Fast build and HMR
- **Tree shaking:** Unused code removed
- **Minification:** Production build

## 🐛 Errors and Solutions

### API Errors

- **401 Unauthorized:** Wrong API key or not confirmed
- **404 Not Found:** City not found
- **429 Too Many Requests:** API limit exceeded

### UI Errors

- **ErrorBoundary:** Catches unexpected errors
- **Loading states:** Improves user experience
- **Error messages:** Clear and understandable messages

## 📝 License

MIT License - See [LICENSE](LICENSE) file

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Contact

- **Email:** diyornv@gmail.com
- **GitHub:** [@your-username](https://github.com/diyornv)

---

⭐ If this project is helpful, give it a star!
