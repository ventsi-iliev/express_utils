import generalStrings from './general-strings.json';

function getString(value: string) {
    return (generalStrings as any)[value];
}

export { getString };