import { getLinesFromInput } from '../../core/readInput';
import { Player } from './classes';
import { playDeterministicGame, getLoser } from './main';

getLinesFromInput('../assets/input.txt').then(lines => {
    console.time();
    let players = lines.map(x => new Player(Number(x.replace(/Player \d+ starting position:\s*/, ''))))
    const rolls = playDeterministicGame(players);
    const loser = getLoser(players);
    const answer = loser.score * rolls;
    console.log('answer:', answer);
    console.timeEnd();
})