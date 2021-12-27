import { getLinesFromInput } from '../../core/readInput';
import { doReboot, countCubes } from './main';

getLinesFromInput('../assets/sample-2758514936282235.txt').then(lines => {
    console.time();
    const cuboid = doReboot(lines);
    const answer = countCubes(cuboid);
    console.log('answer:', answer);
    console.timeEnd();
})