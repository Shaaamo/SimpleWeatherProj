# WeatherApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.7.

## Simple Server code

const http = require('http');
const fs = require('fs');
const path = require('path');

// Порт для сервера
const PORT = 3000;

// Создание сервера
const server = http.createServer((req, res) => {
    // Получаем название города из URL. Ожидаем формат "/cityName"
    const cityName = req.url.slice(1);

    // Формируем путь к изображению, добавляя суффикс "-bg.jpg"
    const imagePath = path.join(__dirname, 'images', `${cityName}-bg.jpg`);

    // Проверка, существует ли файл
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            // Если изображение не найдено, отправляем 404
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Image not found');
            return;
        }

        // Читаем и отправляем изображение
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        const imageStream = fs.createReadStream(imagePath);
        imageStream.pipe(res);
    });
});

// Запуск сервера
server.listen(PORT, 'localhost', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


