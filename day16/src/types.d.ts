interface IPacket {
    version: number;
    typeId: number;
    bits: string;
    leftoverBits: string;
    readonly value: number;
}

interface ILiteralValuePacket extends IPacket {
    literalValue: string;
}

interface IOperatorPacket extends IPacket {
    lengthTypeId: number;
    subPackets: IPacket[];
}