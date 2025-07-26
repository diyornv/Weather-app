import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WeatherWidget from './components/WeatherWidget'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <WeatherWidget />
    </ThemeProvider>
  </StrictMode>,
)
