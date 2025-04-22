<?php
namespace App\Http\Controllers;
use App\Services\WeatherService;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class WeatherController extends Controller
{
    // Changes: Added WeatherService to handle API calls to the weather service.
    protected $weatherService;
    public function __construct(WeatherService $weatherService)
    {
        $this->weatherService = $weatherService;
    }
    public function getWeather(Request $request): JsonResponse
    {
        // Validate the request to ensure a city is provided
        $city = $request->query('city');
        if (!$city) {
            return response()->json(['error' => 'City is required'], 400);
        }
        try {
            // Fetch the weather data using the WeatherService
            $weatherData = $this->weatherService->fetchWeather($city);
            return response()->json(['data' => $weatherData]);
        } catch (\Exception $e) {
            // Handle any exceptions that occur during the API call
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    //Changes: Added getForecast to handle /api/forecast requests.
    public function getForecast(Request $request): JsonResponse
    {
        // Validate the request to ensure a city is provided
        $city = $request->query('city');
        if (!$city) {
            return response()->json(['error' => 'City is required'], 400);
        }
        try {
            // Fetch the forecast data using the WeatherService
            $forecastData = $this->weatherService->fetchForecast($city);
            return response()->json(['data' => $forecastData]);
        } catch (\Exception $e) {
            // Handle any exceptions that occur during the API call
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
