document.getElementById('findTextButton').addEventListener('click', findText);
document.getElementById('replaceButton').addEventListener('click', findAndReplace);


let selectedFile = null;
let inputInfo = {
    text: {
        text: null,
        textToFind: null,
        textToReplace: null
    },
    action: ''
}

function handleTextSelect() {
    inputInfo.text.text = document.getElementById('textInput').value;
    inputInfo.text.textToFind = document.getElementById('textToFind').value;
    inputInfo.text.textToReplace = document.getElementById('textToReplace').value;

    console.log('Selected text from input:' + inputInfo.text);
}
function makeVisible(hiddenElement) {
    document.getElementById(hiddenElement).classList.remove('hidden');
    document.getElementById(hiddenElement).classList.add('visible');
}