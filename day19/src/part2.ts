import { getLinesFromInput } from '../../core/readInput'
import { findAllBeacons, collectScannerData, getLongestManhattanDistance } from './main';

getLinesFromInput('../assets/input.txt').then(lines => {
    console.time();
    const allBeacons = collectScannerData(lines);
    const results = findAllBeacons(allBeacons);
    const longest = getLongestManhattanDistance(results.scanners);
    console.log('answer:', longest);
    console.timeEnd();
})