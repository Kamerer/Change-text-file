document.getElementById('textInput').addEventListener('keydown', handleTextSelect);
document.getElementById('fileInput').addEventListener('change', handleFileSelect);

document.getElementById('modifyButton').addEventListener('click', addQuotes);
document.getElementById('modifyButton2').addEventListener('click', removeDoubleSigns);
document.getElementById('modifyButton3').addEventListener('click', directTranslation);
document.getElementById('copyTextButton').addEventListener('click', copyText);

let selectedFile = null;
let inputInfo = {
    text: null,
    action: ''
}

function handleTextSelect(event) {
    if (event.key === "Enter") {
        buttonEnabler();
        inputInfo.text = document.getElementById('textInput').value;
        console.log('Selected text from input:' + inputInfo.text);
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

            document.getElementById('textInput').textContent = inputInfo.text;
        };
        // Читаем файл как текст
        reader.readAsText(selectedFile);

    } else {
        console.log('Файл не выбран');
    }
}
function makeVisible(hiddenElement) {
    document.getElementById(hiddenElement).classList.remove('hidden');
    document.getElementById(hiddenElement).classList.add('visible');
}