import { getLinesFromInput } from '../../core/readInput'
import { findAllBeacons, collectScannerData } from './main';

getLinesFromInput('../assets/input.txt').then(lines => {
    console.time();
    const allBeacons = collectScannerData(lines);
    const results = findAllBeacons(allBeacons);
    console.log('beacons:', results.beacons);
    console.log('scanners:', results.scanners);
    console.log('answer:', results.beacons.length);
    console.timeEnd();
})