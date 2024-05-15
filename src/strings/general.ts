import general from './general-messages.json';

function getString(value: string) {
    return (general as any)[value];
}

export { getString };