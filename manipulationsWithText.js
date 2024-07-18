export function addQuotes(jsonContent) {
    //console.log(jsonContent);
    if (jsonContent && jsonContent.text) {
        return jsonContent.text.toLowerCase().replace(/\n/g, '\'\,\'').replace(/\r/g, '').replace(/^/, '\'').replace(/$/, '\'');
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