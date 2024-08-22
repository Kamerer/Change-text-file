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
export function directTranslation(jsonContent) {
    const dictionary = {
        all: 'qwertyuiop[]asdfghjkl;\'zxcvbnm,./',
        'q': 'й',
        'w': 'ц',
        'e': 'у',
        'r': 'к',
        't': 'е',
        'y': 'н',
        'u': 'г',
        'i': 'ш',
        'o': 'щ',
        'p': 'з',
        '[': 'х',
        ']': 'ъ',
        'a': 'ф',
        's': 'ы',
        'd': 'в',
        'f': 'а',
        'g': 'п',
        'h': 'р',
        'j': 'о',
        'k': 'л',
        'l': 'д',
        ';': 'ж',
        '\'': 'э',
        'z': 'я',
        'x': 'ч',
        'c': 'с',
        'v': 'м',
        'b': 'и',
        'n': 'т',
        'm': 'ь',
        ',': 'б',
        '.': 'ю',
        '/': '.',
    }
    let stringText = jsonContent.text;
    let result = '';
    for (let digit of stringText) {
        if (dictionary.all.includes(digit.toLowerCase())) {
            result += dictionary[digit.toLowerCase()];
        } else {
            result += digit;
        }
    }
    console.log(result);
    return result;
}

export function findAndReplace(jsonContent) {

}