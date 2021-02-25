import * as fs from "fs";
import * as path from "path";
import { Path, Problem, Street } from "./types";

export function loadFile(filePath: string): Problem {
    const content = fs.readFileSync(path.resolve(process.cwd(), filePath), {
        encoding: "utf-8"
    });
    const [header, ...lines] = content.trim().split("\n");
    const [D, I, S, V, F] = header.split(" ").map(x => parseInt(x, 10));

    const rawStreets = lines.slice(0, S);
    const rawPaths = lines.slice(S);

    const streets: Street[] = rawStreets.map(rawStreet => {
        const [B, E, name, L] = rawStreet.split(" ");
        return {
            startIntersection: parseInt(B, 10),
            endIntersection: parseInt(E, 10),
            name,
            travelTime: parseInt(L, 10)
        }
    });

    const paths: Path[] = rawPaths.map(rawPath => {
        const [P, ...names] = rawPath.split(" ");
        return {
            streetNames: names
        }
    })

    return {
        Duration: D,
        NbIntersections: I,
        NbStreets: S,
        NbCars: V,
        BonusPoints: F,
        streets,
        paths,
    }
}
