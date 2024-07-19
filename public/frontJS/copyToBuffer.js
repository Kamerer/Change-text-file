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