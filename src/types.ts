export interface Problem {
    name: string;
    libraries: Library[];
    books: Book[];
    duration: number;
}
export interface Library {
    id: number;
    books: Book[];
    signup: number;
    booksPerDay: number;
}
export interface Book {
    id: number;
    score: number;
}
export interface Assignment {
    library: Library;
    books: Book[];
}
export type Solution = Assignment[];
