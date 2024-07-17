export function listToString(jsonContent) {
    //return text.toLowerCase().replace(/\r\n/g, '\'\,\'').replace(/^/, '\'').replace(/$/, '\'');
    if (jsonContent && jsonContent.text) {
        return jsonContent.text.toLowerCase().replace(/\r\n/g, '\'\,\'').replace(/^/, '\'').replace(/$/, '\'');
    } else {
        return 'Invalid content';
    }
}