A Todo Task App build using react and laravel.


#### Admin Info
admin@admin.com // admin1234


### 1. Clone the repository and install dependencies

```
cd laravel-react__todo-app
npm install
composer update
php artisan key:generate
```

### 2. Configure your local environment

Create .env file from .env.example after add DB_DATABASE

### 3. Run database migration command

```
php artisan migrate --seed
```

### 3. Start the application locally

```
php artisan serve
npm run watch
```
