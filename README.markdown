# Weather App

A decoupled weather application built with **Next.js** (frontend) and **Laravel** (backend), integrated with the OpenWeatherMap API.

# Prerequisites

- Node.js (&gt;= 18.x)
- PHP (&gt;= 8.2)
- Composer
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

## API Endpoints

- **GET /api/weather?city={city_name}**: Fetch weather data for a given city.

## Features

- Search for weather by city name.
- Display temperature, condition, humidity, and wind speed.
- Responsive design with RippleUI components.
- Error handling and loading states.
- Cached API responses for performance.

## GitHub Commit Messages

Commits follow the conventional commits format:

- `feat`: New features
- `fix`: Bug fixes
- `chore`: Maintenance tasks
- `docs`: Documentation updates

## License

MIT