import { loadFile } from "./loader";
import { saveFile } from "./saver";
import { buildOutput } from "./solution";

run("a");
run("b");
run("c");
run("d");
run("e");
run("f");


function run(file: string) {
    const problem = loadFile(`inputs/${file}.txt`);

    const solution = buildOutput(problem);
    saveFile(`outputs/${file}.txt`, solution);
}
