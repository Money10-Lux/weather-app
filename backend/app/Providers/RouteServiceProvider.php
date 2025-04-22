<?php
namespace App\Providers;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
class RouteServiceProvider extends ServiceProvider
{
    // The path to your "home" route for the application.
    // This is used by Laravel for URL generation and redirection.
    public const HOME = '/dashboard';
    protected $namespace = 'App\Http\Controllers';
    public function boot(): void
    {
        // This method is called when the application boots up.
        // It is used to define the routes for the application.
        $this->configureRateLimiting();
        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));
            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }
    // Define the rate limiters for the application.
    // This is where you can set up different rate limiting strategies for your routes.
    // For example, you can limit the number of requests per minute for API routes.
    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}