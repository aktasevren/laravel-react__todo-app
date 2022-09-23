A Todo Task App build using react and laravel.

### 1. Clone the repository and install dependencies

```
cd todoapp
npm install
composer update
php artisan key:generate
```

### 2. Configure your local environment

Add DB_DATABASE .env file

### 3. Run database migration command

```
php artisan migrate --seed
```

### 3. Start the application locally

```
php artisan serve
npm run watch
```
