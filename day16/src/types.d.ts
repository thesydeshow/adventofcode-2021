interface IPacket {
    version: number;
    typeId: number;
    bits: string;
    leftoverBits: string;
}

interface ILiteralValuePacket extends IPacket {
    literalValue: string;
    readonly value: number;
}

interface IOperatorPacket extends IPacket {
    lengthTypeId: number;
    subPackets: IPacket[];
}