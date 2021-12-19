function getMaxVerticalVelocity(minY: number) {
    return Math.floor(-.5 - minY);
}

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
   const x = getMaxVerticalVelocity(minY);
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

function getBoundVelocityWithMostSteps(target: number): number {
    //a little quadradic formulaing
    return (-1 + Math.pow(1 + 8 * target, 0.5)) / 2;
}

function getBoundVelocity(target: number, step: number): number {
    //TODO: show the maths
    return target / step + 0.5 * step - 0.5;
}

function getUpperBoundVelocity(target: number, step: number, cap: boolean): number {
    let capAt = 0;
    if(cap && step >= (capAt = Math.floor(getBoundVelocityWithMostSteps(target)))) {
        return capAt;
    }

    return Math.floor(getBoundVelocity(target, step));
}

function getLowerBoundVelocity(target: number, step: number, cap: boolean) {
    let capAt = 0;
    if(cap && step >= (capAt = Math.ceil(getBoundVelocityWithMostSteps(target)))) {
        return capAt;
    }

    return Math.ceil(getBoundVelocity(target, step));;
}

function getFeasibleHorizontalVelocities(minX: number, maxX: number, step: number): number[] {
    const top = getUpperBoundVelocity(maxX, step, true);
    const bottom = getLowerBoundVelocity(minX, step, true);
    return Array.from(Array(top-bottom+1), (x,i) => i + bottom);
}

function getFeasibleVerticalVelocities(minY: number, maxY: number, step: number): number[] {
    const top = getUpperBoundVelocity(maxY, step, false);
    const bottom = getLowerBoundVelocity(minY, step, false);
    return Array.from(Array(top-bottom+1), (x,i) => i + bottom);
}

function getMaxSteps(minY: number): number {
    return getMaxVerticalVelocity(minY) * 2 + 2;
}

function getDistinct(vectors: number[][]): number[][] {
    return vectors.filter((x,i) => {
        for(let j = 0; j < vectors.length; j++) {
            if(vectors[j][0] === x[0] && vectors[j][1] === x[1]) {
                return i === j;
            }
        }
    });
}

function getFeasibleStartingVelocityCount(targetCoords: number[][]): number {
    let answers: number[][] = [];
    for(let i = 1; i <= getMaxSteps(targetCoords[0][1]); i++) {
        const hVelocities = getFeasibleHorizontalVelocities(targetCoords[0][0], targetCoords[1][0], i);
        const vVelocities = getFeasibleVerticalVelocities(targetCoords[0][1], targetCoords[1][1], i);
        const shrug = hVelocities.flatMap(x => vVelocities.map(y => [x, y]));
        answers.push(...shrug);
    }
    answers = getDistinct(answers);
    return answers.length;
}

function part2(input: string): number {
    const minAndMaxPoints = parseInput(input);
    const answer = getFeasibleStartingVelocityCount(minAndMaxPoints);
    return answer;
}

console.log(part2('target area: x=20..30, y=-10..-5'));

export {
    getMaxHeight,
    part1,
    part2
}