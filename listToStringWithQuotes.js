export function listToString(text) {
    return text.toLowerCase().replace(/\r\n/g, '\'\,\'').replace(/^/, '\'').replace(/$/, '\'');
}