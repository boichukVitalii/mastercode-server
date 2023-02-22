"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
const node_crypto_1 = require("node:crypto");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const node_child_process_1 = require("node:child_process");
const response_compiler_dto_1 = require("./dto/response-compiler.dto");
class Compiler {
    constructor(code, lang, problem) {
        this.result = {
            logs: '',
            verdict: response_compiler_dto_1.Verdict.Error,
            runTime: undefined,
        };
        this.code = code;
        this.lang = lang;
        this.problem = problem;
        this.imageName = (0, node_crypto_1.randomUUID)();
        this.containerName = (0, node_crypto_1.randomUUID)();
        this.dockerCompilerDir = (0, node_path_1.join)(process.cwd(), 'docker_compiler', this.lang);
        this.appFileName = `app.${this.lang}`;
        this.appFilePath = (0, node_path_1.join)(this.dockerCompilerDir, this.appFileName);
        this.testcaseInputsJSON = JSON.stringify(this.problem.inputs);
        this.testcaseOutputsJSON = JSON.stringify(this.problem.outputs);
        this.testcasesInputsFilePath = (0, node_path_1.join)(this.dockerCompilerDir, 'testcasesInputs.json');
        this.testcasesOutputsFilePath = (0, node_path_1.join)(this.dockerCompilerDir, 'testcasesOutputs.json');
    }
    prepareEnv() {
        (0, node_fs_1.writeFileSync)(this.testcasesInputsFilePath, this.testcaseInputsJSON);
        (0, node_fs_1.writeFileSync)(this.testcasesOutputsFilePath, this.testcaseOutputsJSON);
        (0, node_fs_1.writeFileSync)(this.appFilePath, Buffer.from(this.code.data));
    }
    compile() {
        this.prepareEnv();
        return new Promise((resolve, reject) => {
            const dockerBuild = (0, node_child_process_1.spawn)('docker', ['build', this.dockerCompilerDir, '-t', this.imageName]);
            const data = [];
            const errData = [];
            dockerBuild.stdout.on('end', () => {
                const dockerRun = (0, node_child_process_1.spawn)('docker', ['run', '--name', this.containerName, this.imageName]);
                dockerRun.stdout.on('data', (chunk) => {
                    data.push(chunk);
                });
                dockerRun.stdout.on('end', () => {
                    if (errData.length) {
                        this.result.runTime = undefined;
                        const logs = Buffer.concat(errData).toString();
                        this.result.logs = logs
                            .split('\n')
                            .filter((s) => !s.includes('at'))
                            .join()
                            .replace(/  +/g, ' ');
                        this.result.verdict = response_compiler_dto_1.Verdict.Error;
                    }
                    else {
                        const runTimeRegExp = new RegExp(/Runtime:\d*\.\d*/);
                        const logs = Buffer.concat(data).toString();
                        this.result.runTime = '0.9999';
                        const modifiedLogs = logs
                            .replace(runTimeRegExp, '')
                            .replace('Accepted', '')
                            .replace('Wrong answer - ', '');
                        this.result.logs = modifiedLogs;
                        this.result.verdict =
                            logs.includes(response_compiler_dto_1.Verdict.Accepted) && logs.includes(response_compiler_dto_1.Verdict.WrongAnswer)
                                ? response_compiler_dto_1.Verdict.WrongAnswer
                                : logs.includes(response_compiler_dto_1.Verdict.Accepted)
                                    ? response_compiler_dto_1.Verdict.Accepted
                                    : response_compiler_dto_1.Verdict.WrongAnswer;
                    }
                    resolve(this.result);
                    const rmDocContainer = (0, node_child_process_1.spawn)('docker', ['rm', this.containerName]);
                    rmDocContainer.stdout.on('end', () => (0, node_child_process_1.spawn)('docker', ['rmi', this.imageName]));
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