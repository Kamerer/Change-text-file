export function addQuotes(jsonContent) {
    if (jsonContent && jsonContent.text) {
        return jsonContent.text.toLowerCase().replace(/\r\n/g, '\'\,\'').replace(/^/, '\'').replace(/$/, '\'');
    } else {
        return 'Invalid content';
    }
}
export function removeDoubleSigns(jsonContent) {
    if (jsonContent && jsonContent.text) {
        return jsonContent.text.replace(/(\W)\1+/g, '$1');
    } else {
        return 'Invalid content';
    }
}