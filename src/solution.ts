import { Assignment, Library, Problem, Solution, Book } from "./types";
import * as _ from "lodash";

export function buildOutput(problem: Problem): Assignment[] {
    const logger = buildLogger(problem.name);

    problem.libraries.forEach(l => {
        l.books = _.sortBy(l.books, b => -b.score);
    });

    let remainingDays = problem.duration;
    const assignments: Assignment[] = [];

    const alreadyPickedBooks = new Set<Book>();

    while (assignments.length < problem.libraries.length && remainingDays > 0) {
        problem.libraries.forEach(l => {
            l.books = l.books.filter(b => !alreadyPickedBooks.has(b));
        });
        const assignment = getNextAssignment();
        remainingDays -= assignment.library.signup;
        problem.libraries = problem.libraries.filter(
            l => l.id !== assignment.library.id
        );

        if (assignment.books.length == 0) {
            break;
        }

        assignments.push(assignment);
        assignment.books.forEach(b => alreadyPickedBooks.add(b));

        // logger.log(remainingDays);
    }

    return assignments;

    function getNextAssignment(): Assignment {
        const library = _.maxBy(problem.libraries, getLibraryScoreCapacity);
        if (!library) {
            throw new Error("No library found");
        }
        return {
            library,
            books: _.sortBy(library.books, b => -b.score).slice(
                0,
                getLibraryNumberCapacity(library)
            )
        };

        function getLibraryScoreCapacity(l: Library): number {
            const nBooks = getLibraryNumberCapacity(l);
            const books = l.books.slice(0, nBooks);
            return books.reduce((acc, b) => acc + b.score, 0);
        }
        function getLibraryNumberCapacity(l: Library): number {
            return Math.min(
                (remainingDays - l.signup) * l.booksPerDay,
                l.books.length
            );
        }
    }
}
function buildLogger(fileName: string) {
    const name = (_.last(fileName.split("/")) || "").split(".")[0];
    let lastLogged = Number.MAX_VALUE;

    return {
        log(value: number) {
            if (lastLogged - value > 100) {
                lastLogged = value;
                console.log(name, value);
            }
        }
    };
}
