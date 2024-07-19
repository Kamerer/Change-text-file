function addQuotes() {
    inputInfo.action = 'addQuotes';
    modifyText();
}
function removeDoubleSigns() {
    inputInfo.action = 'removeDoubleSigns';
    modifyText();
}

function modifyText() {
    makeVisible("result");
    if (!inputInfo.text) {
        console.error('No text selected');
        return;
    }

    console.log('Sending text to server:', inputInfo.text);
    fetch('/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputInfo)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Проверка типа содержимого ответа
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else {
            return response.text(); // Если ответ не JSON, возвращаем текст
        }
    })
    .then(modifiedContent => {
        const modifiedContentString = JSON.stringify(modifiedContent.modifiedContent);
        document.getElementById('resultText').textContent = modifiedContentString;
        // Создание нового Blob с измененным содержимым
        const blob = new Blob([modifiedContentString], { type: 'application/json' });

        // Создание ссылки для скачивания измененного файла
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'modified_file.json';
        downloadLink.textContent = 'Download Modified File';
        downloadLink.style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
    });

}