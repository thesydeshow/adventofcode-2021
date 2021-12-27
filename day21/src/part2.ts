import { getLinesFromInput } from '../../core/readInput';
import { Player } from './classes';
import { playDiracGame, getBiggestWinner } from './main';

getLinesFromInput('../assets/input.txt').then(lines => {
    console.time();
    let players = lines.map(x => new Player(Number(x.replace(/Player \d+ starting position:\s*/, ''))))
    playDiracGame(players);
    console.log(players);
    const winner = getBiggestWinner(players);
    console.log('answer:', winner.wins);
    console.timeEnd();
})