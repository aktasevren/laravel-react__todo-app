A Todo Task App build using react and laravel.

### 1. Clone the repository and install dependencies

```
git clone https://github.com/alokpaidalwar/react-laravel-todo.git
cd react-laravel-todo
npm install
composer install
php artisan key:generate
```

### 2. Configure your local environment

Add DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD in .env file

### 3. Run database migration command

```
php artisan migrate
```

### 3. Start the application locally

```
php artisan serve
```
