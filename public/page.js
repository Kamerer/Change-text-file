document.getElementById('textInput').addEventListener('keydown', handleTextSelect);
document.getElementById('fileInput').addEventListener('change', handleFileSelect);

document.getElementById('uploadButton').addEventListener('click', uploadFile);
document.getElementById('modifyButton').addEventListener('click', modifyFile);

let selectedFile = null;
let selectedText = '';
const formData = new FormData();

function handleTextSelect(event) {
    if (event.key === "Enter") {
        document.getElementById('uploadButton').disabled = false;
        selectedText = document.getElementById('textInput').value;
        console.log(selectedText);
    }
}
function handleFileSelect(event) {
    selectedFile = event.target.files[0];
    document.getElementById('uploadButton').disabled = !selectedFile;

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

function uploadFile() {
    if (!selectedFile) {
        return;
    }
    document.getElementById('modifyButton').disabled = !selectedFile;
    formData.append('file', selectedFile);
}
function modifyFile() {
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(modifiedContent => {
        document.getElementById('fileContent').textContent = modifiedContent;

        // Создание нового Blob с измененным содержимым
        const blob = new Blob([modifiedContent], { type: 'text/plain' });

        // Создание ссылки для скачивания измененного файла
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'modified_file.txt';
        downloadLink.textContent = 'Download Modified File';
        downloadLink.style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
    });

}