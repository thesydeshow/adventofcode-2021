export function flipMatrix<T>(matrix: T[][]): T[][]{
    return matrix[0].map((x,i) => matrix.map(x => x[i]));
}