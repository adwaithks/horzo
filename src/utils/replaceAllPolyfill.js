export const replaceAll = (string, replaceChar, substitute) => {
    let newString = string;
    for (let i = 0; i < newString?.length; i ++) {
        if (newString[i] == replaceChar) {
            newString = newString?.replace(newString.charAt(i), substitute);
        }
    }
    return newString;
}