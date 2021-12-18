import { PacketLengthError, PacketTypeError } from './classes';

function getBits(hex: string): string {
    const bits = parseInt(hex, 16).toString(2);

    if(bits.length % 4 === 0) return bits;
    // this will have stripped off leading zeros, so need to add them back on up to 4 digits
    return '0000'.substring(bits.length % 4) + bits;
}

function initLiteralValue(packet: ILiteralValuePacket) {
    if(packet.typeId !== 4) throw new PacketTypeError(packet.typeId, 4);

    let groups = packet.bits.match(/.{1,5}/g) || [];
    if(!groups.length) throw new PacketLengthError('');
    
    for(let group of groups) {
        if(group.length !== 5) throw new PacketLengthError(packet.bits);

        packet.literalValue = (packet.literalValue || '') + group.substring(1);
        if(group.startsWith('0')) return;
    }

    throw new PacketLengthError(packet.bits);
}

function initObjectSubpackets(packet: IOperatorPacket) {
    if(packet.typeId === 4) throw new PacketTypeError(packet.typeId);
}

export {
    getBits,
    initLiteralValue,
    initObjectSubpackets
}