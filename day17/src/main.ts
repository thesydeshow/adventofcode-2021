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
    /*
        We want to find the max (or min) number of steps it would take for within the bounds of the target window when we sum up:
            1 + 2 + 3 + ... + n-2 + n-1 + n
        So we break out Gauss's formula yet again!
            target = 0.5 * n * (1 + n)
        But this time we need to solve for `n`.

        If you remember high school, you remember when presented with a formula:
            0 = ax^2 + bx + c
        ...you solve for `x` with the quadratic formula:
            x = (-b +- sqrt(b^2 - 4ac)) / 2
        
        We have the formula (simplified from earlier):
            target = 0.5*x^2 + 0.5*x
        which we can rewrite into:
            0 = x^2 + x - 2(target)
        which means:
            a = 1
            b = 1
            c = -2 * target
        which results in:
            x = (-1 + sqrt(1^2 - 4(1)(-2 * target))) / 2(1)
        or simplified...
    */
    return (-1 + Math.pow(1 + 8 * target, 0.5)) / 2;
}

function getBoundVelocity(target: number, step: number): number {
    /*
        This started from Gauss's formula:
            sum = 0.5 * (x1 - x0 + 1) * (x1 + x0)
        Since we know the sum (either the min or the max bounds of the target window),
        and we know the number of steps (since we iterating by velocities that take 1 step, velocities that take 2 steps, etc),
        we can rewrite the formula as such:
            minOrMax = 0.5 * n * ((x0 - n + 1) + x0)
        where `n` is the step number we are on, `x0` is the starting velocity as it goes down 1 per step - down to `x0 - n + 1`.

        Solving for x0, we get:
            x0 = minOrMax / n + 0.5 * n - 0.5
        
        If we're passing in the min x or y, we're going to Math.ceil() the result to stay within the target window.
        Similarly, if passing in the max, we're going to Math.floor() the result.
    */
    return target / step + 0.5 * step - 0.5;
}

function getUpperBoundVelocity(target: number, step: number, cap: boolean): number {
    /*
        Cap vs no-cap: for horizontal velocity, the velocity does not degrade lower than 0, so we want to cap it off there at 0.
        But it's the same to cap it off at 1 since it saves us one operation and gives us the same sum.
        
        In other words, instead of having starting the resulting `x` for step n=12 and starting at a velocity of 7 be:
            x = 7 + 6 + 5 + 4 + 3 + 2 + 1 + 0 + -1 + -2 + -3 + -4 = 18
        ...which does not fall within the target window of 20 <= x <= 30, but since v=7 _is_ within the range when capped:
            x = 7 + 6 + 5 + 4 + 3 + 2 + 1 + 0 +  0 +  0 +  0 +  0 = 28
        ...we need to have it use the cap (floor of getBoundVelocityWithMostSteps(30) => 7).
    */
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
    /*
        So I originally thought I would just grab the number feasible starting points for X and Y velocity where:
            min <= x + x-1 + x-2 + ... x-(n-2) + x-(n-1) <= max
        or...
            min <= x + x-1 + x-2 + ... 2 + 1 <= max  [for horizontal velocity, since that will not decrease past 0]
        Where `min` is the left/top bounds of the target window, `max` is the right/bottom bounds, `n` is the step number, and `x` is a starting velocity.
        
        And multiply the possible starting x velocities and y velocities for each step number (up to the max y velocity, similar to what was solved for in part 1).

        But it turns out there were multiple starting velocities that would land in the target window at consecutive steps.
        For example, starting velocity (8,0) would land in the sample's target window (x=20..30, y=-10..-5) at [26,-6] and [30,-10].
        
        I had to refactor the functions to return the possible starting velocities for that axis for the current step.
        Then do a cartesian join of the two sets of the current step, then distinct the new set.
    */
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
    /*
        If the max vertical velocity is x:
        - then it will take x+1 steps to reach the apex
        - and another x steps to reach y=0
        - and 1 more step to reach the bottom of the target window
            maxN = x + 1 + x + 1 = 2x + 2
    */
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

console.time();
console.log(part2('target area: x=253..280, y=-73..-46'));
console.timeEnd();

export {
    getMaxHeight,
    part1,
    part2
}