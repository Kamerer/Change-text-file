document.getElementById('textInput').addEventListener('keydown', handleTextSelect);
document.getElementById('fileInput').addEventListener('change', handleFileSelect);

//document.getElementById('uploadButton').addEventListener('click', uploadFile);
document.getElementById('modifyButton').addEventListener('click', modifyFile);

let selectedFile = null;
let selectedText = '111';

function handleTextSelect(event) {
    if (event.key === "Enter") {
        document.getElementById('modifyButton').disabled = false;
        selectedText = document.getElementById('textInput').value;
        console.log('Selected text from input:' + selectedText);
    }
}
function handleFileSelect(event) {
    selectedFile = event.target.files[0];
    document.getElementById('modifyButton').disabled = !selectedFile;

    if (selectedFile) {
        // Создаем FileReader для чтения файла
        const reader = new FileReader();

        // Определяем, что делать, когда файл будет прочитан
        reader.onload = function(e) {
            selectedText = e.target.result;
            console.log('Содержимое файла:', selectedText);

            // Выводим содержимое файла в элемент с id "output"
            document.getElementById('rawText').textContent = selectedText;
        };
        // Читаем файл как текст
        reader.readAsText(selectedFile);

    } else {
        console.log('Файл не выбран');
    }
}

function modifyFile() {
    if (!selectedText) {
        console.error('No text selected');
        return;
    }

    console.log('Sending text to server:', selectedText);
    fetch('/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: selectedText })
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
        const modifiedContentString = JSON.stringify(modifiedContent, null, 2);
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