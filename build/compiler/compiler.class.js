"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
const response_compiler_dto_1 = require("./dto/response-compiler.dto");
const node_crypto_1 = require("node:crypto");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const node_child_process_1 = require("node:child_process");
class Compiler {
    constructor(code, lang, problem) {
        this.code = code;
        this.lang = lang;
        this.problem = problem;
        this.imageName = (0, node_crypto_1.randomUUID)();
        this.containerName = (0, node_crypto_1.randomUUID)();
        this.dockerCompilerDir = (0, node_path_1.join)(process.cwd(), 'docker_compiler', this.lang);
        this.solutionResultDir = (0, node_path_1.join)(process.cwd(), '..', 'results', this.lang, (0, node_crypto_1.randomUUID)());
        this.solutionFileName = `solution.${this.lang}`;
        this.uniqueUserSolutionDir = (0, node_path_1.join)(process.cwd(), '..', 'images', (0, node_crypto_1.randomUUID)());
        this.solutionFilePath = (0, node_path_1.join)(this.uniqueUserSolutionDir, this.solutionFileName);
        this.testcaseInputsJSON = JSON.stringify(this.problem.inputs);
        this.testcaseOutputsJSON = JSON.stringify(this.problem.outputs);
        this.testcasesInputsFilePath = (0, node_path_1.join)(this.uniqueUserSolutionDir, 'testcasesInputs.json');
        this.testcasesOutputsFilePath = (0, node_path_1.join)(this.uniqueUserSolutionDir, 'testcasesOutputs.json');
    }
    prepareEnv() {
        (0, node_fs_1.mkdirSync)(this.uniqueUserSolutionDir, { recursive: true });
        (0, node_fs_1.cpSync)(this.dockerCompilerDir, this.uniqueUserSolutionDir, { recursive: true });
        (0, node_fs_1.writeFileSync)(this.testcasesInputsFilePath, this.testcaseInputsJSON);
        (0, node_fs_1.writeFileSync)(this.testcasesOutputsFilePath, this.testcaseOutputsJSON);
        (0, node_fs_1.writeFileSync)(this.solutionFilePath, Buffer.from(this.code.data));
        (0, node_fs_1.mkdirSync)((0, node_path_1.join)(this.uniqueUserSolutionDir, 'result'), { recursive: true });
        (0, node_fs_1.mkdirSync)(this.solutionResultDir, { recursive: true });
    }
    clear() {
        (0, node_fs_1.rmSync)(this.uniqueUserSolutionDir, { recursive: true, force: true });
        (0, node_fs_1.rmSync)(this.solutionResultDir, { recursive: true, force: true });
    }
    compile() {
        this.prepareEnv();
        return new Promise((resolve, reject) => {
            const data = [];
            const errData = [];
            const dockerBuild = (0, node_child_process_1.spawn)('docker', [
                'build',
                this.uniqueUserSolutionDir,
                '-t',
                this.imageName,
            ]);
            dockerBuild.on('exit', () => {
                const dockerRun = (0, node_child_process_1.spawn)('docker', [
                    'run',
                    '--name',
                    this.containerName,
                    '-v',
                    `${this.solutionResultDir}:/opt/app/result`,
                    this.imageName,
                ]);
                dockerRun.stdout.on('data', (chunk) => data.push(chunk));
                dockerRun.on('exit', () => {
                    if (errData.length) {
                        const logs = Buffer.concat(errData).toString();
                        const modifiedLogs = logs
                            .split('\n')
                            .filter((s) => !s.includes('at'))
                            .join()
                            .replace(/  +/g, ' ');
                        this.result = new response_compiler_dto_1.ResponseCompilerDto(response_compiler_dto_1.Verdict.Error, modifiedLogs);
                    }
                    else {
                        const [resultData, runTime] = (0, node_fs_1.readFileSync)(`${this.solutionResultDir}/result.txt`, 'utf-8').split('\n');
                        const verdict = resultData.includes(response_compiler_dto_1.Verdict.Accepted)
                            ? response_compiler_dto_1.Verdict.Accepted
                            : response_compiler_dto_1.Verdict.WrongAnswer;
                        this.result = new response_compiler_dto_1.ResponseCompilerDto(verdict, resultData, runTime);
                    }
                    resolve(this.result);
                    const rmDocContainer = (0, node_child_process_1.spawn)('docker', ['rm', this.containerName]);
                    rmDocContainer.on('exit', () => (0, node_child_process_1.spawn)('docker', ['rmi', this.imageName]));
                    this.clear();
                });
                dockerRun.stderr.on('data', (errChunk) => errData.push(errChunk));
                dockerRun.on('error', (err) => reject(err));
            });
            dockerBuild.stderr.on('data', (errChunk) => reject(errChunk.toString()));
            dockerBuild.on('error', (err) => reject(err));
        });
    }
}
exports.Compiler = Compiler;
//# sourceMappingURL=compiler.class.js.map