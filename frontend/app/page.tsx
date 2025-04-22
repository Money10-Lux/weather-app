'use client';

import { useState, FormEvent } from 'react';
import axios from 'axios';
import WeatherDisplay from '../Components/WeatherDisplay';


export default function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setWeatherData(null);
    setForecastData(null);

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/weather', { params: { city } }),
        axios.get('http://127.0.0.1:8000/api/forecast', { params: { city } }),
      ]);
      setWeatherData(weatherResponse.data.data);
      setForecastData(forecastResponse.data.data.list);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-900">
      <h1 className="text-5xl font-bold text-white mb-8">Weather App</h1>
      <form onSubmit={fetchWeather} className="mb-8 flex gap-2 max-w-md w-full">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="p-3 bg-gray-800 text-white border border-gray-600 rounded-l-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition"
        >
          Get Weather
        </button>
      </form>
      
      <WeatherDisplay weather={weatherData} forecast={forecastData} error={error} />
    </main>
  );
}

// Changes:
// Fetch both /api/weather and /api/forecast using Promise.all.
// Changed input field to white text (text-white) on a dark background (bg-gray-800).
// Used a dark app background (bg-gray-900) to match wireframe’s modern look.
// Improved form styling: rounded corners, focus ring, hover effects.
// Centered layout to align with wireframe.