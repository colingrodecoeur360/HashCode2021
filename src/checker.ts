import * as fs from "fs";
import * as path from "path";

checkFile("a");

function checkFile(fileName: string): void {
    assertFileIsValid(fileName);
    storeIfBestScore(fileName);
}

function assertFileIsValid(name: string): void {
    const content = loadFile(name);
    // next
}
function storeIfBestScore(name: string) {
    const current = loadFile(`outputs/${name}.out`);
    const best = loadFile(`bests/${name}.out`);

    const currentScore = computeScore(current);
    const bestScore = computeScore(best);

    if (currentScore > bestScore) {
        copyFile();
    }

    function computeScore(content: Content): number {
        return 0;
    }
    function copyFile() {
        fs.copyFileSync(
            path.resolve(process.cwd(), `outputs/${name}.out`),
            path.resolve(process.cwd(), `bests/${name}.out`)
        );
    }
}

function loadFile(filePath: string): Content {
    const content = fs.readFileSync(path.resolve(process.cwd(), filePath), {
        encoding: "utf-8"
    });
    const [header, body] = content.split("\n");
    return { header, body };
}

interface Content {
    header: string;
    body: string;
}
