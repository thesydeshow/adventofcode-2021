import * as day12 from './main'

test('part 1 - small sample', () => {
    console.log = jest.fn();
    day12.part1('sample-10.txt');
    expect(console.log).toHaveBeenCalledWith('answer:', 10);
});