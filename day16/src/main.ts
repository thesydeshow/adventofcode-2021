import { LiteralPacket, OperatorPacket, Packet, PacketLengthError, PacketTypeError } from './classes';

function getSingleBits(hex: string): string {
    const bits = parseInt(hex, 16).toString(2);

    if(bits.length % 4 === 0) return bits;
    // this will have stripped off leading zeros, so need to add them back on up to 4 digits
    return '0000'.substring(bits.length % 4) + bits;
}

function getBits(hex: string): string {
    return hex.split('').reduce((p,c) => p + getSingleBits(c), '');
}

function initLiteralValue(packet: ILiteralValuePacket) {
    if(packet.typeId !== 4) throw new PacketTypeError(packet.typeId, 4);

    let groups = packet.bits.match(/.{1,5}/g) || [];
    if(!groups.length) throw new PacketLengthError('');
    
    do {
        const group = groups.shift();

        if(group?.length !== 5) throw new PacketLengthError(packet.bits);

        packet.literalValue = (packet.literalValue || '') + group.substring(1);
        if(group.startsWith('0')) {
            if(groups.length) {
                packet.leftoverBits = groups.reduce((p,c) => p + c);
            }
            return;
        }
    } while(groups.length);

    throw new PacketLengthError(packet.bits);
}

function initOperatorSubpackets(packet: IOperatorPacket) {
    if(packet.typeId === 4) throw new PacketTypeError(packet.typeId);

    let subpacketsLeft = 999;
    let subpacketsBits = '';
    if(packet.lengthTypeId === 0) {
        const subpacketBitsLength = parseInt(packet.bits.substring(0, 15), 2);
        packet.leftoverBits = packet.bits.substring(15 + subpacketBitsLength);
        subpacketsBits = packet.bits.substring(15, 15 + subpacketBitsLength);
    } else if(packet.lengthTypeId === 1) {
        subpacketsLeft = parseInt(packet.bits.substring(0, 11), 2);
        subpacketsBits = packet.bits.substring(11);
    }
    
    while(subpacketsBits.length && subpacketsLeft) {
        if(new Packet(subpacketsBits).typeId === 4) {
            const subpacket = new LiteralPacket(subpacketsBits);
            packet.subPackets.push(subpacket);
            subpacketsBits = subpacket.leftoverBits;
        } else {
            const subpacket = new OperatorPacket(subpacketsBits);
            packet.subPackets.push(subpacket);
            subpacketsBits = subpacket.leftoverBits;
        }
        subpacketsLeft--;
    }

    if(!subpacketsLeft) {
        packet.leftoverBits = subpacketsBits;
    }
}

function getVersionSum(packet: IPacket): number {
    if(packet instanceof(LiteralPacket)) {
        return packet.version;
    }

    return packet.version + (<OperatorPacket>packet).subPackets.reduce((p,c) => p + getVersionSum(c), 0);
}

function part1(hex: string): number {
    const bits = getBits(hex);
    const packet = new OperatorPacket(bits);
    return getVersionSum(packet);
}

export {
    getBits,
    initLiteralValue,
    initOperatorSubpackets,
    part1
}