import { getBits, part1 } from '../src/main';
import { LiteralPacket, OperatorPacket, PacketTypeError, PacketLengthError } from '../src/classes';

const getBitsCases = [
    ['D2FE28','110100101111111000101000'],
    ['38006F45291200', '00111000000000000110111101000101001010010001001000000000'],
    ['EE00D40C823060', '11101110000000001101010000001100100000100011000001100000'],
    ['8A004A801A8002F478', '100010100000000001001010100000000001101010000000000000101111010001111000']
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

const operatorPacketCases = [
    ['00111000000000000110111101000101001010010001001000000000', 2],
    ['11101110000000001101010000001100100000100011000001100000', 3]
]

describe('operator packet test', () => {
    test.each(operatorPacketCases)('given %p as Operator constructor arg, returns OperatorPacket with %p suubpackets', (argument, expectedPackets) => {
        const result = new OperatorPacket(<string>argument);
        expect(result.subPackets.length).toEqual(expectedPackets);
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

const part1Samples = [
    ['8A004A801A8002F478', 16],
    ['620080001611562C8802118E34', 12],
    ['C0015000016115A2E0802F182340', 23],
    ['A0016C880162017C3686B18A3D4780', 31]
]

describe('part 1 samples', () => {
    test.each(part1Samples)('given %p as part 1 input, returns version sum of %p', (argument, expectedResult) => {
        const result = part1(<string>argument);
        expect(result).toEqual(expectedResult);
    })
})