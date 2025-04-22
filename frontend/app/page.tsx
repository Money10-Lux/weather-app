'use client';

import { useState, FormEvent } from 'react';
import axios from 'axios';
import WeatherDisplay from '../Components/WeatherDisplay';

// This is a client component
// It fetches weather data from the backend API and displays it
// It uses the useState hook to manage state and axios for HTTP requests
// The component is styled using Tailwind CSS classes
// The form allows the user to input a city name and fetch weather data
// The fetched data is displayed in a structured format
// The component handles errors gracefully and provides user feedback
// The layout is responsive and adapts to different screen sizes
export default function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch weather data from the API
  // It uses axios to make GET requests to the backend API
  // The function is triggered on form submission
  const fetchWeather = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setWeatherData(null);
    setForecastData(null);

    try {
      // Fetch weather and forecast data concurrently using Promise.all
      // This improves performance by reducing the number of network requests
      // and allows both requests to be handled in parallel
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/weather', { params: { city } }),
        axios.get('http://127.0.0.1:8000/api/forecast', { params: { city } }),
      ]);
      // Set the fetched data to state variables
      // This triggers a re-render of the component with the new data
      // The weather data includes current conditions and other relevant information
      setWeatherData(weatherResponse.data.data);
      setForecastData(forecastResponse.data.data.list);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
    }
  };
  // The component returns a JSX structure
  // It includes a form for user input, a button to fetch data, and a display area for results
  // The form uses Tailwind CSS classes for styling and responsiveness
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
