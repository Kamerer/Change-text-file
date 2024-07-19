document.getElementById('textInput').addEventListener('keydown', handleTextSelect);
document.getElementById('fileInput').addEventListener('change', handleFileSelect);

//document.getElementById('uploadButton').addEventListener('click', uploadFile);
document.getElementById('modifyButton').addEventListener('click', addQuotes);
document.getElementById('modifyButton2').addEventListener('click', removeDoubleSigns);
document.getElementById('copyTextButton').addEventListener('click', copyText);


let selectedFile = null;
let inputInfo = {
    text: null,
    action: ''
}

function buttonEnabler() {
    document.getElementById('modifyButton').disabled = false;
    document.getElementById('modifyButton2').disabled = false;
    document.getElementById('copyTextButton').disabled = false;

}

function handleTextSelect(event) {
    if (event.key === "Enter") {
        buttonEnabler();
        inputInfo.text = document.getElementById('textInput').value;
        console.log('Selected text from input:' + inputInfo.text);
        document.getElementById('rawText').textContent = inputInfo.text;

    }
}
function handleFileSelect(event) {
    selectedFile = event.target.files[0];
    buttonEnabler();

    if (selectedFile) {
        // Создаем FileReader для чтения файла
        const reader = new FileReader();

        // Определяем, что делать, когда файл будет прочитан
        reader.onload = function(e) {
            inputInfo.text = e.target.result;
            console.log('Содержимое файла:', inputInfo.text);

            document.getElementById('rawText').textContent = inputInfo.text;
        };
        // Читаем файл как текст
        reader.readAsText(selectedFile);

    } else {
        console.log('Файл не выбран');
    }
}
function addQuotes() {
    inputInfo.action = 'addQuotes';
    modifyText();
}
function removeDoubleSigns() {
    inputInfo.action = 'removeDoubleSigns';
    modifyText();
}

function modifyText() {
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

function copyText() {
    // Получаем элемент textarea
    var textArea = document.getElementById("resultText");
    console.log('fffff');
    // Копируем текст в буфер обмена с использованием Clipboard API
    navigator.clipboard.writeText(textArea.value).then(function() {
        console.log("Текст скопирован: " + textArea.value);
    }).catch(function(err) {
        console.error("Ошибка копирования текста: ", err);
    });
}