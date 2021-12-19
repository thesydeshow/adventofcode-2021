import { getBits, part1, part2 } from '../src/main';
import { LiteralPacket, OperatorPacket, Packet, PacketTypeError, PacketLengthError } from '../src/classes';

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
    
    test('given OperatorPacket with type id greater than 7, throws invalid type exception', () => {
        expect(() => {
            let packet = new OperatorPacket(<string>operatorPacketCases[0][0]);
            packet.typeId = 8;
            const value = packet.value;
        }).toThrow(PacketTypeError);
    })
    
    test('given OperatorPacket with type id less than 0, throws invalid type exception', () => {
        expect(() => {
            let packet = new OperatorPacket(<string>operatorPacketCases[0][0]);
            packet.typeId = -1;
            const value = packet.value;
        }).toThrow(PacketTypeError);
    })
})

test('base packet value throws', () => {
    expect(() => {new Packet('00010000000').value}).toThrow(ReferenceError);
})


const part1Samples = [
    ['8A004A801A8002F478', 16],
    ['620080001611562C8802118E34', 12],
    ['C0015000016115A2E0802F182340', 23],
    ['A0016C880162017C3686B18A3D4780', 31],
    ['220D790065B2745FF004672D99A34E5B33439D96CEC80373C0068663101A98C406A5E7395DC1804678BF25A4093BFBDB886CA6E11FDE6D93D16A100325E5597A118F6640600ACF7274E6A5829B00526C167F9C089F15973C4002AA4B22E800FDCFD72B9351359601300424B8C9A00BCBC8EE069802D2D0B945002AB2D7D583E3F00016B05E0E9802BA00B4F29CD4E961491CCB44C6008E80273C393C333F92020134B003530004221347F83A200D47F89913A66FB6620016E24A007853BE5E944297AB64E66D6669FCEA0112AE06009CAA57006A0200EC258FB0440010A8A716A321009DE200D44C8E31F00010887B146188803317A3FC5F30056C0150004321244E88C000874468A91D2291802B25EB875802B28D13550030056C0169FB5B7ECE2C6B2EF3296D6FD5F54858015B8D730BB24E32569049009BF801980803B05A3B41F1007625C1C821256D7C848025DE0040E5016717247E18001BAC37930E9FA6AE3B358B5D4A7A6EA200D4E463EA364EDE9F852FF1B9C8731869300BE684649F6446E584E61DE61CD4021998DB4C334E72B78BA49C126722B4E009C6295F879002093EF32A64C018ECDFAF605989D4BA7B396D9B0C200C9F0017C98C72FD2C8932B7EE0EA6ADB0F1006C8010E89B15A2A90021713610C202004263E46D82AC06498017C6E007901542C04F9A0128880449A8014403AA38014C030B08012C0269A8018E007A801620058003C64009810010722EC8010ECFFF9AAC32373F6583007A48CA587E55367227A40118C2AC004AE79FE77E28C007F4E42500D10096779D728EB1066B57F698C802139708B004A5C5E5C44C01698D490E800B584F09C8049593A6C66C017100721647E8E0200CC6985F11E634EA6008CB207002593785497652008065992443E7872714', 989]
]

describe('part 1 samples', () => {
    test.each(part1Samples)('given %p as part 1 input, returns version sum of %p', (argument, expectedResult) => {
        const result = part1(<string>argument);
        expect(result).toEqual(expectedResult);
    })
})

const part2Samples = [
    ['C200B40A82', 3],
    ['04005AC33890', 54],
    ['880086C3E88112', 7],
    ['CE00C43D881120', 9],
    ['D8005AC2A8F0', 1],
    ['F600BC2D8F', 0],
    ['9C005AC2F8F0', 0],
    ['9C0141080250320F1802104A08', 1]
]

describe('part 2 samples', () => {
    test.each(part2Samples)('given %p as part 2 input, returns packet value of %p', (argument, expectedResult) => {
        const result = part2(<string>argument);
        expect(result).toEqual(expectedResult);
    })
})