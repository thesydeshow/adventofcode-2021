interface IDijkstra {
    x: number;
    y: number;
    riskLevel: number;
    visited: boolean;
    distance: number;
    previousNode: IDijkstra | undefined;
}