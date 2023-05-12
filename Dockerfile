# Frontend
FROM node:16.18.0-alpine AS frontend
WORKDIR /app
COPY client/ ./
RUN npm install 
RUN npm install @mui/material
RUN npm install @mui/icons-material
RUN npm install axios js-cookie react-router-dom
RUN npm run build

# Backend
FROM php:7.4.9-apache AS backend
WORKDIR /var/www/html
RUN apt-get update && \
    apt-get install -y libzip-dev && \
    docker-php-ext-install pdo_mysql zip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
COPY server/ ./
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# Composer
FROM composer:1.10 AS composer
COPY server/composer.json server/composer.lock /app/
RUN composer install --ignore-platform-reqs --no-interaction --no-scripts --no-autoloader

# Copy SweetAlert files
FROM frontend AS sweetalert
WORKDIR /app
RUN npm install sweetalert
RUN mkdir -p /app/public/js
RUN cp -R ./node_modules/sweetalert/dist/* /app/public/js

# Combined Image
FROM php:7.4.9-apache AS final
WORKDIR /var/www/html
RUN apt-get update && \
    apt-get install -y libzip-dev && \
    docker-php-ext-install pdo_mysql zip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
COPY --from=frontend /app/build/ ./
COPY --from=backend /var/www/html /var/www/html
COPY --from=composer /app/vendor /var/www/html/server/vendor

# Set up Apache and enable mod_rewrite
RUN a2enmod rewrite

# Copy .htaccess file
COPY .htaccess /var/www/html/server/public/.htaccess

EXPOSE 80

CMD ["apache2-foreground"]