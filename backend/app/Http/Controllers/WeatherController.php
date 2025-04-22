<?php
namespace App\Http\Controllers;
use App\Services\WeatherService;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class WeatherController extends Controller
{
    protected $weatherService;
    public function __construct(WeatherService $weatherService)
    {
        $this->weatherService = $weatherService;
    }
    public function getWeather(Request $request): JsonResponse
    {
        $city = $request->query('city');
        if (!$city) {
            return response()->json(['error' => 'City is required'], 400);
        }
        try {
            $weatherData = $this->weatherService->fetchWeather($city);
            return response()->json(['data' => $weatherData]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
