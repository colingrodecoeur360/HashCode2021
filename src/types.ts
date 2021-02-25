export interface Problem {
    Duration: number;
    NbIntersections: number;
    NbStreets: number;
    NbCars: number;
    BonusPoints: number;
    streets: Street[];
    paths: Path[];
}

export interface Street {
    startIntersection: Intersection;
    endIntersection: Intersection;
    name: string;
    travelTime: number;
}

export type Intersection = number;

export interface Path {
    streetNames: string[];
}

export interface Solution {
    nbIntersections: number;
    schedules: Schedule[];
}

export interface Schedule {
    intersection: Intersection;
    nbStreets: number;
    pattern: { streetName: string; duration: number; }[]
}
