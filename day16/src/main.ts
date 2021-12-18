function getBits(hex: string): string {
    const bits = parseInt(hex, 16).toString(2);

    if(bits.length % 4 === 0) return bits;
    // this will have stripped off leading zeros, so need to add them back on up to 4 digits
    return '0000'.substring(bits.length % 4) + bits;
}



export {
    getBits
}