interface IPacket {
    version: number;
    typeId: number;
}

interface ILiteralValuePacket extends IPacket {
    literalValue: string;
    value: number;
}

interface IOperatorPacket extends IPacket {
    lengthTypeId: number;
    subPackets: IPacket[];
}