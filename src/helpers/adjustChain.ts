export function adjustChain(this: any) {
    Object.setPrototypeOf(this, this.constructor.prototype);
}