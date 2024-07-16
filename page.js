document.getElementById('fileInput').addEventListener('change', handleFileSelect);
document.getElementById('uploadButton').addEventListener('click', uploadFile);
//document.getElementById('modifyFile').addEventListener('click', modifyFile);

let selectedFile = null;

function handleFileSelect(event) {
    selectedFile = event.target.files[0];
    document.getElementById('uploadButton').disabled = true;
    //document.getElementById('modifyFile').disabled = true;
}

function uploadFile() {
    if (!selectedFile) {
        return;
    }
    const formData = new FormData();
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