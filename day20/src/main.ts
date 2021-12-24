function pixelToBinary(pixel: string): (0|1) {
    return pixel === '#' ? 1 : 0;
}

export function parseInput(lines: string[]): { algorithm: string, image: (0|1)[][] } {
    let image = [];
    for(let i = 2; i < lines.length; i++) {
        image.push(lines[i].split('').map(pixelToBinary));
    }
    return { algorithm: lines[0], image }
}

export function padImage(image: (0|1)[][], iterations: number = 1) {
    if(iterations <= 0) return;

    for(let i = 0; i < image.length; i++) {
        image[i].unshift(0);
        image[i].push(0);
    }
    const newWidth = image[0].length;
    image.unshift(Array(newWidth).fill(0));
    image.push(Array(newWidth).fill(0));

    padImage(image, --iterations);
}

export function trimImage(image: (0|1)[][], iterations: number = 1) {
    if(iterations <= 0) return;

    image.pop();
    image.shift();
    for(let i = 0; i < image.length; i++) {
        image[i].pop();
        image[i].shift();
    }

    trimImage(image, --iterations);
}

export function enhance(image: (0|1)[][], algorithm: string, pads: number = 2, trims: number = 0): (0|1)[][] {
    padImage(image, pads);

    let enhancedImage: (0|1)[][] = [];
    for(let i = 1; i < image.length - 1; i++) {
        enhancedImage.push([]);
        for(let j = 1; j < image[i].length - 1; j++) {
            const bits = `${image[i-1][j-1]}${image[i-1][j]}${image[i-1][j+1]}${image[i][j-1]}${image[i][j]}${image[i][j+1]}${image[i+1][j-1]}${image[i+1][j]}${image[i+1][j+1]}`;
            const index = parseInt(bits, 2);
            enhancedImage[i-1].push(pixelToBinary(algorithm.substring(index, index+1)));
        }
    }

    trimImage(image, trims);
    return enhancedImage;
}

export function lightPixelCount(image: (0|1)[][]): number {
    return image.flat().reduce((p: number,c) => p + c, 0);
}

export function print(image: (0|1)[][]) {
    for(let i = 0; i < image.length; i++) {
        console.log(image[i].map(x => x ? '#' : '.').join(''));
    }
    console.log();
}