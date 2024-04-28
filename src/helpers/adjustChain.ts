export function adjustChain(this: any) {
    console.log(this, this.constructor.prototype);
    Object.setPrototypeOf(this, this.constructor.prototype);
}