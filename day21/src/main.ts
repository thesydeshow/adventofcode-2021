export function takeTurn(startingPosition: number, spin1: number, spin2: number, spin3: number): number {
    const spun = spin1 + spin2 + spin3;
    const finalPosition = (startingPosition + spun - 1) % 10 + 1;
    return finalPosition;
}

export function rollDeterministicDice(lastRoll: number, player: IPlayer): number {
    const newPosition = takeTurn(player.position, ++lastRoll, ++lastRoll, ++lastRoll);
    player.position = newPosition;
    player.score += newPosition;
    return lastRoll;
}