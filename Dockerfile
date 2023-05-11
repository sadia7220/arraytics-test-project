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
FROM php:7.4.9-fpm-alpine AS backend
WORKDIR /app
RUN apk add --no-cache bash php7-cli && \
    apk add --no-cache php7 && \
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer && \
    php -r "unlink('composer-setup.php');"
COPY server/ ./

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
FROM alpine:3.14.2
WORKDIR /var/www/html
RUN apk add --no-cache php7
COPY --from=frontend /app/build/ ./
COPY --from=backend /app /var/www/html/server/
COPY --from=composer /app/vendor /var/www/html/server/vendor

EXPOSE 80

CMD ["php", "-S", "0.0.0.0:80", "-t", "/var/www/html/"]
