# arraytics-test-project

## Initialize

- Clone the project from git repo.
~~~shell
git clone https://github.com/sadia7220/arraytics-test-project.git
~~~
- Go inside the project directory.
~~~shell
cd arraytics-test-project
~~~
- Switch to the master branch.
~~~shell
git checkout master
~~~
- Switch to the server(back-end) folder to install laravel dependencies.
~~~shell
cd server
composer install
~~~
- in the .env file of server add the database information in the below variables (if the .env file is not available, create one)  in the below variables 
~~~shell
DB_DATABASE =
DB_USERNAME =
DB_PASSWORD =
~~~
- set up the server(back-end) laravel project.
~~~shell
php artisan key:generate
php artisan migrate
~~~
- run the server(back-end) laravel project.
~~~shell
php artisan serve
~~~
- Switch to the client(front-end) folder to install react dependencies.
~~~shell
cd ..
cd client
npm install
~~~
- in the .env file of client add the backend url in following variable (if the .env file is not available, create one) 
(in local server it will be http://127.0.0.1:8000/api)
~~~shell
REACT_APP_BACKEND_URL =
~~~
- To view the project in your browser, run 
~~~shell
npm start
~~~
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) in your browser if the project doesnot start automatically.
