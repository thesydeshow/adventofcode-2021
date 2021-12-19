import { initLiteralValue, initOperatorSubpackets } from './main'

export class Packet implements IPacket {
    version: number;
    typeId: number;
    bits: string;
    leftoverBits: string;

    constructor(packetBits: string) {
        this.version = parseInt(packetBits.substring(0, 3), 2);
        this.typeId = parseInt(packetBits.substring(3, 6), 2);
        this.bits = packetBits.substring(6);
        this.leftoverBits = '';
    }
}

export class LiteralPacket extends Packet implements ILiteralValuePacket {
    literalValue: string;

    constructor(packetBits: string) {
        super(packetBits);
        this.literalValue = '';
        initLiteralValue(this);
    }

    get value(): number {
        return parseInt(this.literalValue, 2);
    }
}

export class OperatorPacket extends Packet implements IOperatorPacket {
    lengthTypeId: number;
    subPackets: IPacket[];

    constructor(packetBits: string) {
        super(packetBits);
        this.lengthTypeId = parseInt(this.bits.substring(0, 1));
        this.bits = this.bits.substring(1);
        this.subPackets = [];
        initOperatorSubpackets(this);
    }
}


export class PacketTypeError extends Error {
    constructor(typeId: number, expectedTypeId: number | undefined = undefined) {
        let errorMessage = `Invalid type id: ${typeId}`;
        if(expectedTypeId) errorMessage += `; expected: ${expectedTypeId}`;
        super(errorMessage);
    }
}

export class PacketLengthError extends Error {
    constructor(bits: string) {
        super(`Invalid packet length: ${bits}`);
    }
}