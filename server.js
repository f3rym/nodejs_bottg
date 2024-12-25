const express = require('express');
const app = express();

// Установите порт
const PORT = process.env.PORT || 443;

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
