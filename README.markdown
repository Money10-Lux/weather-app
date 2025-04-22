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
   if you run into an error during 'composer install' due to difficulty in loading the PHP openssl, then,
   
   Enable the OpenSSL Extension in php.ini by removing the semicolon (;) at the beggining of ;extension=openssl to enable the extension,
   so it reads, extension=openssl
   
   In php.ini, ensure the extension_dir is correctly set to point to the ext folder, that is, extension_dir = "path to/php/ext" by using     forward slashes. then try installation again.

   If the `file extension` error is encountered then open your "path\php\php.ini" and enable file info extension by removing semicolons (;)     then run composer install again:
   ```bash
   extension=fileinfo
   extension=openssl

   ```

   with successful installation of composer the `vendor` directory should now exist in the `backend` directory

   If `composer.json` and `artisan` files are missing, then create a fresh Laravel project in the `backend` directory

   ```bash
   composer create-project laravel/laravel .
   ```
   this will create the full project structure, including: artisan, app/, routes/ composer.json and vendor/
   then integrate Weather App Codes (e.g., WeatherController.php, WeatherService.php, api.php, composer.json) into the new Laravel           project.

4. Copy `.env.example` to `.env` and add your OpenWeatherMap API key in the .env file:

   ```env
   OPENWEATHERMAP_API_KEY=your_api_key
   ```

5. Generate an app key:

   ```bash
   php artisan key:generate
   ```

6. Start the Laravel server:

   ```bash
   php artisan serve
   ```

   The API will be available at `http://localhost:8000`.

   If you get a database error then you can switch to file since the weather app may not need a database.
   Change the session driver to file, (storage/framework/sessions) instead of a database. This avoids the need for database.sqlite.

   Update `.env`
   ```bash
   SESSION_DRIVER=file
   CACHE_DRIVER=file
   CACHE_STORE=file

   ```

   The Laravel server should now start correctly with php artisan serve, and accessing http://127.0.0.1:8000 displays the default Laravel welcome page.
   ### Test in Browser:
   - Visit http://127.0.0.1:8000/api/weather?city=Nairobi

### Frontend (Next.js)

1. Navigate to the root `weather-app` directory and initialize Next.js Project:

   ```bash
   npx create-next-app@latest frontend
   ```
  - Prompts:
     - Typescript: Yes.
     - ESLint: Yes.
     - Tailwind CSS: Yes.
     - src/ directory: No.
     -  App Router: Yes.
     -  Import alias: Default (@/*).
      This creates path...\weather-app\frontend.

   

2. Install dependencies:
   Navigate to frontend.
   ```bash
   cd frontend
   ```
   Install Axios for API requests:

   ```bash
   npm install axios
   ```
3. Add frontend code
   path....\weather-app\frontend\components\WeatherDisplay.tsx

   ```bash
   mkdir components
   echo. > components\WeatherDisplay.tsx
   ```
   Then incoporate the WeatherDisplay.tsx

   Upadate the page.tsx
  path...\weather-app\frontend\app\page.tsx

4. Start the development server (front end):
   Naviagte to `frontend` directory: cd path...\weather-app\frontend

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

## Screenshots

### backend
![image](https://github.com/user-attachments/assets/a602e790-c265-4630-8703-2be45d19ab34)

### frontend welcoming page
![image](https://github.com/user-attachments/assets/c7fc8145-b80a-4fc9-9206-54fa26318362)

### frontend Display page
![image](https://github.com/user-attachments/assets/e03a18d1-c62b-4c1c-8353-6fd1cb6fcb72)

### frontend Display page - contains warning
![image](https://github.com/user-attachments/assets/b80d849d-40f3-498e-8374-840e6a15e761)


## License

MIT
