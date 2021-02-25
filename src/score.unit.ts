import {Assignment, Book, Library, Problem} from "./types";
import { computeScore } from "./score"
import { expect } from "chai";

describe("score", () => {
    it("should compute the score", () => {
        const problem: Problem = {
            name: "Problem",
            libraries: [],
            books: [],
            duration: 10
        };
        const assignments: Assignment[] = [];

        const result = computeScore(problem, assignments);

        expect(result).to.equal(0);
    })
})
