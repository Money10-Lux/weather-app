<?php
namespace App\Services;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
class WeatherService
{
    protected $apiKey;
    protected $baseUrl;
    public function __construct()
    {
        // Fetch the API key from the environment variables.
        // If not set, use a default value (this should be replaced with your actual API key).
        $this->apiKey = env('OPENWEATHERMAP_API_KEY', 'YOUR_API_KEY');
        $this->baseUrl = 'https://api.openweathermap.org/data/2.5';
    }
    // Fetch the current weather data for a given city.
    // This method caches the results for 10 minutes to reduce API calls.
    public function fetchWeather(string $city): array
    {
        $cacheKey = "weather_{$city}";
        $cacheDuration = 600;
        return Cache::remember($cacheKey, $cacheDuration, function () use ($city) {
            $response = Http::get("{$this->baseUrl}/weather", [
                'q' => $city,
                'appid' => $this->apiKey,
                'units' => 'metric',
            ]);
            if ($response->failed()) {
                throw new \Exception('Unable to fetch weather data from OpenWeatherMap');
            }
            return $response->json();
        });
    }
    //Changes: Added fetchForecast to call OpenWeatherMap’s /forecast endpoint, caching results for 10 minutes.
    public function fetchForecast(string $city): array
    {
        // Fetch the forecast data for a given city.
        $cacheKey = "forecast_{$city}";
        $cacheDuration = 600;
        return Cache::remember($cacheKey, $cacheDuration, function () use ($city) {
            $response = Http::get("{$this->baseUrl}/forecast", [
                'q' => $city,
                'appid' => $this->apiKey,
                'units' => 'metric',
            ]);
            if ($response->failed()) {
                throw new \Exception('Unable to fetch forecast data from OpenWeatherMap');
            }
            return $response->json();
        });
    }
}