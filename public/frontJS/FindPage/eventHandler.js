document.getElementById('findTextButton').addEventListener('click', findText);
document.getElementById('replaceButton').addEventListener('click', findAndReplace);


let selectedFile = null;
let inputInfo = {
    text: null,
    action: ''
}

function handleTextSelect(event) {
    if (event.key === "Enter") {
        buttonEnabler();
        inputInfo.text.text = document.getElementById('textInput').value;
        inputInfo.text.textToFind = document.getElementById('textToFind').value;
        inputInfo.text.textToReplace = document.getElementById('textToReplace').value;

        console.log('Selected text from input:' + inputInfo.text);
    }
}