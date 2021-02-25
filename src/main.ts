import { loadFile } from "./loader";
import { saveFile } from "./saver";
import { buildOutput } from "./solution";
import { computeScore } from "./score";

run("a");
run("b");
run("c");
run("e");
run("f");

run("d");

function run(file: string) {
    const problem = loadFile(`inputs/${file}.txt`);
    const solution = buildOutput(problem);
    console.log(file, computeScore(problem, solution));
    saveFile(`outputs/${file}.txt`, solution);
}