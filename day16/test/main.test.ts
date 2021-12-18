import { getBits } from '../src/main'

const getBitsCases =
    [
        ['D2FE28','110100101111111000101000'],
        ['38006F45291200', '00111000000000000110111101000101001010010001001000000000'],
        ['EE00D40C823060', '11101110000000001101010000001100100000100011000001100000']
    ];

describe('hex to binary function', () => {
    test.each(getBitsCases)('given %p as argument, returns %p', (argument, expectedResult) => {
        const result = getBits(argument);
        expect(result).toEqual(expectedResult);
    })
})

