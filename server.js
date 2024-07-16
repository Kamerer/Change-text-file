const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Настройка multer для обработки загрузки файлов
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static('public'));

// Обработка загрузки файла и его изменения
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const fileContent = req.file.buffer.toString('utf8');

    // Изменение содержимого файла
    const modifiedContent = fileContent.toLowerCase().replace(/\r\n/g, '\'\,\'').replace(/^/, '\'').replace(/$/, '\'');

    res.send(modifiedContent);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});