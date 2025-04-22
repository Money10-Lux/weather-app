# Weather App

This is a weather application built with **Next.js** for frontend and **Laravel** for backend, integrated with the OpenWeatherMap API for weather data.

## Prerequisites

- Node.js (&gt;= 22.14.0)
- Laravel Framework (&gt;= 12.9.2)
- PHP (&gt;= 8.4.6)
- Composer (&gt;= 2.8.8)
- OpenWeatherMap API key (sign up at https://openweathermap.org/api)

## Setup Instructions

### Backend (Laravel)

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   composer install
   ```

3. Copy `.env.example` to `.env` and add your OpenWeatherMap API key:

   ```env
   OPENWEATHERMAP_API_KEY=your_api_key
   ```

4. Generate an app key:

   ```bash
   php artisan key:generate
   ```

5. Start the Laravel server:

   ```bash
   php artisan serve
   ```

   The API will be available at `http://localhost:8000`.

### Frontend (Next.js)

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

## Features

- Search for weather by city name.
- Display temperature, condition, humidity, and wind speed.
- Responsive design with RippleUI components.
- Error handling and loading states.
- Cached API responses for performance.

## License

MIT
