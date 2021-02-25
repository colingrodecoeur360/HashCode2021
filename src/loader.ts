import * as fs from "fs";
import * as path from "path";
import { Book, Library, Problem } from "./types";

export function loadFile(filePath: string): Problem {
    const content = fs.readFileSync(path.resolve(process.cwd(), filePath), {
        encoding: "utf-8"
    });
    const [header, scores, ...libraryLines] = content.trim().split("\n");

    const books: Book[] = scores.split(" ").map((value, index) => ({
        id: index,
        score: parseInt(value)
    }));

    const libraries: Library[] = [];

    for (let i = 0; i < libraryLines.length / 2; i++) {
        libraries.push({
            id: i,
            signup: parseInt(libraryLines[2 * i].split(" ")[1]),
            booksPerDay: parseInt(libraryLines[2 * i].split(" ")[2]),
            books: libraryLines[2 * i + 1]
                .split(" ")
                .map(index => books[parseInt(index)])
        });
    }

    const [B, L, D] = header.split(" ").map(v => parseInt(v));
    if (books.length !== B || libraries.length !== L) {
        throw new Error("load error");
    }

    return {
        name: filePath,
        libraries,
        books,
        duration: D
    };
}
