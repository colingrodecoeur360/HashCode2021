import * as fs from "fs";
import * as path from "path";
import { Solution } from "./types";

export function saveFile(fileName: string, solution: Solution): void {
    const lines = [];
    lines.push(solution.nbIntersections.toString());
    solution.schedules.forEach(schedule => {
        lines.push(schedule.intersection);
        lines.push(schedule.nbStreets);
        schedule.pattern.forEach(element => {
            lines.push([element.streetName, element.duration.toString()].join(" "));
        });
    })

    const content = lines.join("\n");

    fs.writeFileSync(path.resolve(process.cwd(), fileName), content, {
        encoding: "utf-8"
    });
}
