<?php
// Path: backend/routes/api.php
use App\Http\Controllers\WeatherController;
use Illuminate\Support\Facades\Route;
// Define the API routes for the application.
// These routes are prefixed with 'api' and are grouped under the 'api' middleware.
Route::get('/weather', [WeatherController::class, 'getWeather']);
// Changes: Added a new route for fetching weather forecasts using the getForecast method in WeatherController.
Route::get('/forecast', [WeatherController::class, 'getForecast']);

// This route will handle GET requests to /api/forecast and return the weather forecast for a specified city.
// The city parameter should be passed as a query string, e.g., /api/forecast?city=Nairobi
// The getForecast method in the WeatherController will handle the request and return the forecast data.