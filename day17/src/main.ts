function getMaxHeight(minY: number): number {
    /*
        Our parabola's formula is...
               y = -.5x^2 - .5x  (not accounting for deltas in x and y to pass through 0,0 at various slopes)
        meaning our first derivative is...
              y' = -x - .5
        We want to find the point where the derivative is equal to the change in our starting y (0) and the bottom left corner's y (minY), meaning...
            minY = -x - .5, or
               x = -.5 - minY
        This x is the highest x value where the delta in y will occur, and since we need x to be an int, we will Math.floor it...
               x = floor(-.5 - minY)
        Plugging x into the original parabola's formula will get us the distance dropped, which we can negate and get the max height possible.
    */
   const x = Math.floor(-.5 - minY);
   const maxHeight = .5 * Math.pow(x, 2) + .5 * x;
   return maxHeight;
}

function parseInput(input: string): number[][] {
    const matches = input.match(/x=(\d+)\.\.(\d+), y=(\-?\d+)\.\.(\-?\d+)/) || [];
    if(matches.length < 5) throw new Error(`Invalid input: ${input}`);

    return [[Number(matches[1]), Number(matches[3])], [Number(matches[2]), Number(matches[4])]];
}

function part1(input: string): number {
    const minAndMaxPoints = parseInput(input);
    const answer = getMaxHeight(minAndMaxPoints[0][1]);
    return answer;
}

export {
    getMaxHeight,
    part1
}