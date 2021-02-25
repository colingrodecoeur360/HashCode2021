import { Assignment, Book, Problem } from "./types";

export function computeScore(
    problem: Problem,
    assignments: Assignment[]
): number {
    const scannedBooks = new Set<Book>();

    let startDay = 0;

    assignments.forEach(assignment => {
        startDay += assignment.library.signup;
        if (startDay >= problem.duration) return;

        const books = assignment.library.books.slice(
            0,
            (problem.duration - startDay) * assignment.library.booksPerDay
        );
        books.forEach(b => scannedBooks.add(b));
    });

    let score = 0;
    scannedBooks.forEach(b => {
        score += b.score;
    });
    return score;
}
