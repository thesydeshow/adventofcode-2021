export class Cuboid implements ICuboid {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
    z0: number;
    z1: number;

    constructor(x0: number, x1: number, y0: number, y1: number, z0: number, z1: number) {
        this.x0 = x0;
        this.x1 = x1;
        this.y0 = y0;
        this.y1 = y1;
        this.z0 = z0;
        this.z1 = z1;
    }

    get area(): number {
        return (this.x1 - this.x0 + 1) * (this.y1 - this.y0 + 1) * (this.z1 - this.z0 + 1);
    }

    intersects(cuboid: ICuboid): boolean {
        return (cuboid.x0 <= this.x0 && this.x0 <= cuboid.x1 || this.x0 <= cuboid.x0 && cuboid.x0 <= this.x1)
            && (cuboid.y0 <= this.y0 && this.y0 <= cuboid.y1 || this.y0 <= cuboid.y0 && cuboid.y0 <= this.y1)
            && (cuboid.z0 <= this.z0 && this.z0 <= cuboid.z1 || this.z0 <= cuboid.z0 && cuboid.z0 <= this.z1);
    }

    envelops(cuboid: ICuboid): boolean {
        return this.x0 <= cuboid.x0 && this.x1 >= cuboid.x1
            && this.y0 <= cuboid.y0 && this.y1 >= cuboid.y1
            && this.z0 <= cuboid.z0 && this.z1 >= cuboid.z1;
    }

    split(cuboid: ICuboid): Cuboid[] {
        if(!this.intersects(cuboid)) {
            throw new Error('These cuboids do not intersect!');
        }

        const overlap = new Cuboid(
            Math.max(this.x0, cuboid.x0), Math.min(this.x1, cuboid.x1),
            Math.max(this.y0, cuboid.y0), Math.min(this.y1, cuboid.y1),
            Math.max(this.z0, cuboid.z0), Math.min(this.z1, cuboid.z1)
        );
        let splits = [];
        if(this.x0 < cuboid.x0) {
            splits.push(new Cuboid(this.x0, cuboid.x0 - 1, this.y0, this.y1, this.z0, this.z1));
        }
        if(this.x1 > cuboid.x1) {
            splits.push(new Cuboid(cuboid.x1 + 1, this.x1, this.y0, this.y1, this.z0, this.z1));
        }
        if(this.y0 < cuboid.y0) {
            splits.push(
                new Cuboid(overlap.x0, overlap.x1, this.y0, cuboid.y0 - 1, this.z0, this.z1));
        }
        if(this.y1 > cuboid.y1) {
            splits.push(
                new Cuboid(overlap.x0, overlap.x1, cuboid.y1 + 1, this.y1, this.z0, this.z1));
        }
        if(this.z0 < cuboid.z0) {
            splits.push(
                new Cuboid(overlap.x0, overlap.x1, overlap.y0, overlap.y1, this.z0, cuboid.z0 - 1));
        }
        if(this.z1 > cuboid.z1) {
            splits.push(
                new Cuboid(overlap.x0, overlap.x1, overlap.y0, overlap.y1, cuboid.z1 + 1, this.z1));
        }
        return splits;
    }
}