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
        $this->apiKey = env('OPENWEATHERMAP_API_KEY', 'YOUR_API_KEY');
        $this->baseUrl = 'https://api.openweathermap.org/data/2.5';
    }
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
  }
