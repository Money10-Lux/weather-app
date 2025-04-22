import React, { useState } from 'react';

interface WeatherData {
  main: { temp: number; feels_like: number; humidity: number; pressure: number };
  weather: { description: string; icon: string; id: number }[];
  wind: { speed: number; deg: number };
  sys: { sunrise: number; sunset: number };
  name: string;
  dt: number;
}

interface ForecastData {
  dt: number;
  main: { temp: number };
  weather: { description: string; icon: string; id: number }[];
}

interface WeatherDisplayProps {
  weather: WeatherData | null;
  forecast: ForecastData[] | null;
  error: string | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather, forecast, error }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [isWindMs, setIsWindMs] = useState(true);

  // Toggle temperature unit
  const toggleTempUnit = () => {
    setIsCelsius(!isCelsius);
  };

  // Toggle wind speed unit (m/s to km/h)
  const toggleWindUnit = () => {
    setIsWindMs(!isWindMs);
  };

  // Convert temperature between Celsius and Fahrenheit
  const convertTemperature = (temp: number) => {
    return isCelsius ? temp : (temp * 9) / 5 + 32;
  };

  // Convert wind speed between m/s and km/h
  const convertWindSpeed = (speed: number) => {
    return isWindMs ? speed : speed * 3.6; // 1 m/s = 3.6 km/h
  };

  // Convert degrees to wind direction
  const getWindDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  // Check for severe weather warnings (e.g., thunderstorms, heavy rain)
  const getSevereWeatherWarning = () => {
    const severeIds = [
      200, 201, 202, 210, 211, 212, 221, 230, 231, 232, // Thunderstorms
      502, 503, 504, // Heavy rain
      602, 622, // Heavy snow
      781, // Tornado
    ];
    const currentWarning = weather?.weather[0]?.id && severeIds.includes(weather.weather[0].id);
    const forecastWarnings = forecast?.some((item) => item.weather[0]?.id && severeIds.includes(item.weather[0].id));
    return currentWarning || forecastWarnings;
  };

  // Format date as "22nd April 2025 London" with superscript suffix
  const formatDate = (timestamp: number, city: string) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const suffix = (day: number) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    const suffixText = suffix(day);
    const formattedDate = `${day} ${date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })}`;
    return { formattedDate, suffixText, city };
  };

  if (error) {
    return <div className="text-red-300 text-center">{error}</div>;
  }

  if (!weather) {
    return <div className="text-white text-center">Enter a city to see weather data</div>;
  }

  // Filter forecast to show one entry per day (e.g., 12:00 PM)
  const dailyForecast = forecast
    ? forecast.filter((item) => new Date(item.dt * 1000).getHours() === 12).slice(0, 5)
    : [];

  const severeWarning = getSevereWeatherWarning();
  const { formattedDate, suffixText, city } = formatDate(weather.dt, weather.name);

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-xl shadow-xl max-w-5xl w-full relative">
      {/* Toggle Temperature Unit Button */}
      <button
        onClick={toggleTempUnit}
        className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-400 transition"
      >
        {isCelsius ? '°F' : '°C'}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel: Main Weather Info with Boundary */}
        <div className="col-span-1 bg-blue-700 p-6 rounded-lg border border-blue-400 shadow-md">
          <h2 className="text-4xl font-bold text-white mb-4">{weather.name}</h2>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="w-16 h-16"
            />
            <div>
              <p className="text-2xl text-white capitalize">{weather.weather[0].description}</p>
              <p className="text-5xl font-semibold text-white">
                {convertTemperature(weather.main.temp).toFixed(2)}°{isCelsius ? 'C' : 'F'}
              </p>
            </div>
          </div>
          <p className="text-xl text-white">
            Feels Like: {convertTemperature(weather.main.feels_like).toFixed(2)}°{isCelsius ? 'C' : 'F'}
          </p>
          <p className="text-xl text-white">Pressure: {weather.main.pressure} hPa</p>
          <div className="mt-4">
            <p className="text-xl text-white">
              Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-xl text-white">
              Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          {/* Severe Weather Warning */}
          {severeWarning && (
            <div className="mt-4 p-3 bg-red-500 text-white rounded-md">
              <p className="font-bold">⚠ Severe Weather Warning</p>
              <p>Potential severe weather conditions detected. Stay safe!</p>
            </div>
          )}
          {/* Date at the Bottom with Superscript Suffix */}
          <p className="text-xl text-white mt-6">
            {formattedDate.split(' ').map((part, index) => (
              <span key={index}>
                {index === 0 ? (
                  <span>
                    {part}
                    <sup>{suffixText}</sup>
                  </span>
                ) : (
                  <span> {part}</span>
                )}
              </span>
            ))}{' '}
            {city}
          </p>
        </div>

        {/* Center-Right Panel: 5-Day Forecast and Additional Info */}
        <div className="col-span-2">
          {/* 5-Day Forecast with Boundary */}
          {dailyForecast.length > 0 && (
            <div className="mb-8 bg-blue-700 p-6 rounded-lg border border-blue-400 shadow-md">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">5-Day Forecast</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {dailyForecast.map((item, index) => (
                  <div key={index} className="bg-blue-600 p-4 rounded-lg text-center">
                    <p className="text-white font-semibold">
                      {new Date(item.dt * 1000).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <img
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt="Forecast Icon"
                      className="w-12 h-12 mx-auto"
                    />
                    <p className="text-white">
                      {convertTemperature(item.main.temp).toFixed(2)}°{isCelsius ? 'C' : 'F'}
                    </p>
                    <p className="text-white capitalize text-sm">{item.weather[0].description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wind Speed and Humidity with Boundary */}
          <div className="bg-blue-700 p-6 rounded-lg border border-blue-400 shadow-md space-y-6">
            {/* Wind Speed */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-xl text-white">
                  Wind Speed: {convertWindSpeed(weather.wind.speed).toFixed(2)} {isWindMs ? 'm/s' : 'km/h'} ({getWindDirection(weather.wind.deg)})
                </p>
                <button
                  onClick={toggleWindUnit}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-400 transition"
                >
                  {isWindMs ? 'km/h' : 'm/s'}
                </button>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-blue-400 h-4 rounded-full"
                  style={{ width: `${Math.min(weather.wind.speed * 10, 100)}%` }} // Scale wind speed for bar (max 10 m/s for 100%)
                ></div>
              </div>
            </div>

            {/* Humidity */}
            <div>
              <p className="text-xl text-white mb-2">Humidity: {weather.main.humidity}%</p>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-blue-400 h-4 rounded-full"
                  style={{ width: `${weather.main.humidity}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;

// Changes:
// Added support for forecast data to display 5-day forecast.
// Used a blue gradient background (from-blue-600 to-blue-800) instead of white.
// Changed text to white (text-white) for high contrast.
// Added weather icons from OpenWeatherMap.
// Styled to match wireframe: card-like layout, centered text, modern typography.


// Changes:
// Added useState to manage the temperature unit (isCelsius).
// Added a convertTemperature function to switch between Celsius and Fahrenheit.
// Added a toggle button in the top-right corner (absolute top-4 right-4) to switch units.
// Updated the interface to include wind in WeatherData and display wind speed.
// Applied the temperature conversion to both current weather and forecast.

//Changes:
// Layout: Used grid grid-cols-1 lg:grid-cols-3 to create a left panel (1/3) for main weather info and a center-right panel (2/3) for the forecast and additional info.
// 5-Day Forecast: Positioned in the center-right panel using col-span-2, maintaining the grid layout for the forecast cards.
// Wind Speed:
// Added wind direction using getWindDirection (e.g., "SW" from degrees).
// Added a toggle for m/s to km/h using convertWindSpeed.
// Added a bar indicator scaling wind speed (capped at 10 m/s for 100% width).
// Humidity: Added a bar indicator for humidity percentage.
// Severe Weather Warnings: Added a getSevereWeatherWarning function to check for severe weather IDs (e.g., thunderstorms, heavy rain) and display a warning if detected.
// Additional Features:
// Added “feels like” temperature (main.feels_like).
// Added sunrise/sunset times (sys.sunrise, sys.sunset).
// Added pressure (main.pressure).

//Changes:
//Date: Added the dt field to the WeatherData interface and 
// created a formatDate function to display the date as "22nd April 2025 London" 
// at the bottom of the left panel.
//Boundary: Added bg-blue-700 p-6 rounded-lg border border-blue-400 shadow-md 
// to the left panel’s div to give it a distinct background, padding, rounded corners, 
// a light blue border, and a subtle shadow for visual separation.