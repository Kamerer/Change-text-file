const fs = require('fs');
const path = require('path');

// Указываем путь к файлу
const filePath = path.join(__dirname, 'testFile.txt');

// Функция для чтения файла, преобразования данных и записи обратно в файл
function processFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.error('Ошибка чтения файла:', err);
    }

    // Преобразуем данные в одну строку
    let transformedData = data.toLowerCase().replace(/\r\n/g, '\'\,\'').replace(/^/, '\'').replace(/$/, '\'');

    // Записываем преобразованные данные обратно в файл
    fs.writeFile(filePath, transformedData, 'utf8', (err) => {
      if (err) {
        return console.error('Ошибка записи файла:', err);
      }
      console.log('Файл успешно обновлен.');
    });
  });
}

// Вызываем функцию обработки файла
processFile(filePath);