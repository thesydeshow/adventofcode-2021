interface ICuboid {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
    z0: number;
    z1: number;

    readonly area: number;
    intersects(cuboid: ICuboid): boolean;
    envelops(cuboid: ICuboid): boolean;
    split(cuboid: ICuboid): ICuboid[];
}