import { getBits } from '../src/main';
import { LiteralPacket, PacketTypeError, PacketLengthError, OperatorPacket } from '../src/classes';

const getBitsCases = [
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

const literalPacketCases = [
    ['110100101111111000101000', '011111100101', 2021],
    ['01010000001', '0001', 1],
    ['10010000010', '0010', 2],
    ['00110000011', '0011', 3]
]

describe('literal value packet test', () => {
    test.each(literalPacketCases)('given %p as LiteralPacket constructor arg, returns LiteralPacket with literal %p and value %p', (argument, expectedString, expectedNumber) => {
        const result = new LiteralPacket(<string>argument);
        expect(result.literalValue).toEqual(expectedString);
        expect(result.value).toEqual(expectedNumber);
    })
})

describe('literal value packet throwing invalid type exception', () => {
    test.each([['0011100000000000011011']])('given %p as LiteralPacket constructor arg, throws invalid type exception', (argument) => {
        expect(() => {new LiteralPacket(argument)}).toThrow(PacketTypeError);
    })
})

describe('literal value packet throwing invalid length exception', () => {
    test.each([['110100'], ['1101001011'], ['110100101111111010101']])('given %p as LiteralPacket constructor arg, throws invalid length exception', (argument) => {
        expect(() => {new LiteralPacket(argument)}).toThrow(PacketLengthError);
    })
})

describe('operation packet throwing invalid type exception', () => {
    test.each([['110100101111111000101000']])('given %p as OperatorPacket constructor arg, throws invalid type exception', (argument) => {
        expect(() => {new OperatorPacket(argument)}).toThrow(PacketTypeError);
    })
})