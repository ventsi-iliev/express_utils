import { replaceStringMessagePlaceholder } from "../replace-string-message-placeholder";

it('replace correctly two placeholders with two values', () => {
    let str = 'Password must be between ${} and ${} characters';

    let replacedStr = replaceStringMessagePlaceholder(str, ['5', '20']);

    expect(replacedStr).toEqual('Password must be between 5 and 20 characters');
});

it('replace a placeholder with empty string', () => {
    let str = 'Database connection failed! ${}';

    let replacedStr = replaceStringMessagePlaceholder(str, ['']);

    let finalStr = 'Database connection failed!';

    expect(replacedStr).toEqual(finalStr);
    expect(replacedStr).not.toEqual(finalStr + ' ');
})