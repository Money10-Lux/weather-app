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

   The `file extension` error is encountered then open your "path\php\php.ini" and enable file info extension by removing semicolons (;)     then run composer install again:
   ```bash
   ;extension=fileinfo to extension=fileinfo
   ```

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
