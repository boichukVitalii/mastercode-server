"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
const response_compiler_dto_1 = require("./dto/response-compiler.dto");
const fsp = __importStar(require("node:fs/promises"));
const node_crypto_1 = require("node:crypto");
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
        this.uniqueUserSolutionDockerImgDir = (0, node_path_1.join)(process.cwd(), '..', 'images', (0, node_crypto_1.randomUUID)());
        this.solutionResultDirInDockerImgDir = (0, node_path_1.join)(this.uniqueUserSolutionDockerImgDir, 'result');
        this.solutionResultDirInDocker = (0, node_path_1.join)('/opt', 'app', 'result');
        this.solutionResultDirInHostFS = (0, node_path_1.join)(process.cwd(), '..', 'results', this.lang, (0, node_crypto_1.randomUUID)());
        this.solutionResultFileInHostFS = (0, node_path_1.join)(this.solutionResultDirInHostFS, 'result.txt');
        this.solutionFileName = `solution.${this.lang}`;
        this.solutionFilePath = (0, node_path_1.join)(this.uniqueUserSolutionDockerImgDir, this.solutionFileName);
        this.testcasesInputsJSON = JSON.stringify(this.problem.inputs);
        this.testcasesOutputsJSON = JSON.stringify(this.problem.outputs);
        this.testcasesInputsFilePath = (0, node_path_1.join)(this.uniqueUserSolutionDockerImgDir, 'testcasesInputs.json');
        this.testcasesOutputsFilePath = (0, node_path_1.join)(this.uniqueUserSolutionDockerImgDir, 'testcasesOutputs.json');
    }
    async prepareEnv() {
        await fsp.mkdir(this.uniqueUserSolutionDockerImgDir, { recursive: true });
        await fsp.cp(this.dockerCompilerDir, this.uniqueUserSolutionDockerImgDir, { recursive: true });
        await fsp.mkdir(this.solutionResultDirInDockerImgDir, { recursive: true });
        await fsp.mkdir(this.solutionResultDirInHostFS, { recursive: true });
        await fsp.writeFile(this.testcasesInputsFilePath, this.testcasesInputsJSON);
        await fsp.writeFile(this.testcasesOutputsFilePath, this.testcasesOutputsJSON);
        await fsp.writeFile(this.solutionFilePath, Buffer.from(this.code.data));
    }
    async clear() {
        await fsp.rm(this.uniqueUserSolutionDockerImgDir, { recursive: true, force: true });
        await fsp.rm(this.solutionResultDirInHostFS, { recursive: true, force: true });
    }
    async compile() {
        await this.prepareEnv();
        return new Promise((resolve, reject) => {
            const logData = [];
            const errData = [];
            const dockerBuild = (0, node_child_process_1.spawn)('docker', [
                'build',
                this.uniqueUserSolutionDockerImgDir,
                '-t',
                this.imageName,
            ]);
            dockerBuild.on('exit', () => {
                const dockerRun = (0, node_child_process_1.spawn)('docker', [
                    'run',
                    '--name',
                    this.containerName,
                    '-v',
                    `${this.solutionResultDirInHostFS}:${this.solutionResultDirInDocker}`,
                    this.imageName,
                ]);
                dockerRun.stdout.on('data', (chunk) => logData.push(chunk));
                dockerRun.on('exit', async () => {
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
                        const logs = Buffer.concat(logData).toString();
                        const [resultData, runTime] = (await fsp.readFile(this.solutionResultFileInHostFS, 'utf-8')).split('\n');
                        const verdict = resultData.includes(response_compiler_dto_1.Verdict.Accepted)
                            ? response_compiler_dto_1.Verdict.Accepted
                            : response_compiler_dto_1.Verdict.WrongAnswer;
                        this.result = new response_compiler_dto_1.ResponseCompilerDto(verdict, logs, runTime);
                    }
                    resolve(this.result);
                    const rmDocContainer = (0, node_child_process_1.spawn)('docker', ['rm', this.containerName]);
                    rmDocContainer.on('exit', () => (0, node_child_process_1.spawn)('docker', ['rmi', this.imageName]));
                    await this.clear();
                });
                dockerRun.stderr.on('data', (errChunk) => errData.push(errChunk));
                dockerRun.stderr.on('end', async () => await this.clear());
                dockerRun.on('error', async (err) => {
                    await this.clear();
                    reject(err);
                });
            });
            dockerBuild.stderr.on('data', async (errChunk) => {
                await this.clear();
                reject(errChunk.toString());
            });
            dockerBuild.on('error', async (err) => {
                await this.clear();
                reject(err);
            });
        });
    }
}
exports.Compiler = Compiler;
//# sourceMappingURL=compiler.class.js.map