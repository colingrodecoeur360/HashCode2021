import * as fs from "fs";
import * as path from "path";
import { Solution } from "./types";

export function saveFile(fileName: string, assignments: Solution): void {
    const lines = [];
    lines.push(assignments.length.toString());
    assignments.forEach(assignment => {
        lines.push(assignment.library.id + " " + assignment.books.length);
        lines.push(assignment.books.map(book => book.id).join(" "));
    });

    const content = lines.join("\n");

    fs.writeFileSync(path.resolve(process.cwd(), fileName), content, {
        encoding: "utf-8"
    });
}
