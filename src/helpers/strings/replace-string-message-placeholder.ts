export function replaceStringMessagePlaceholder(str: string, stringsToReplace: Array<string>, replacer: string | '${}' = '${}') {
    let copyStr = str;

    for(let v of stringsToReplace) {
        copyStr = copyStr.replace(replacer, v);
    }

    return copyStr.trim();
}