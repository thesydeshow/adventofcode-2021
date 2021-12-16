export class Dijkstra implements IDijkstra {
    x: number;
    y: number;
    riskLevel: number;
    visited: boolean;
    distance: number;
    previousNode: Dijkstra | undefined;

    constructor(x: number, y: number, value: number) {
        this.x = x;
        this.y = y;
        this.riskLevel = value;
        this.visited = false;
        this.distance = 99999999999999;
    }
}