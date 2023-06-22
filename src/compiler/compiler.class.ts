import { Problem } from 'src/problem/entities/problem.entity';
import { TLanguage } from 'src/user/entities/user-solved-problem.entity';
import { ResponseCompilerDto, Verdict } from './dto/response-compiler.dto';
import { CodeType } from './dto/compiler.dto';

import * as fsp from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { join } from 'node:path';
import { spawn } from 'node:child_process';

export class Compiler {
	private readonly code: CodeType;
	private readonly lang: TLanguage;
	private readonly problem: Problem;
	private readonly imageName: string;
	private readonly containerName: string;
	private readonly dockerCompilerDir: string;
	private readonly uniqueUserSolutionDockerImgDir: string;
	private readonly solutionResultDirInDockerImgDir: string;
	private readonly solutionResultDirInDocker: string;
	private readonly solutionResultDirInHostFS: string;
	private readonly solutionResultFileInHostFS: string;
	private readonly solutionFileName: string;
	private readonly solutionFilePath: string;
	private readonly testcasesInputsJSON: string;
	private readonly testcasesOutputsJSON: string;
	private readonly testcasesInputsFilePath: string;
	private readonly testcasesOutputsFilePath: string;
	private result: ResponseCompilerDto;

	constructor(code: CodeType, lang: TLanguage, problem: Problem) {
		this.code = code;
		this.lang = lang;
		this.problem = problem;

		this.imageName = randomUUID();
		this.containerName = randomUUID();

		this.dockerCompilerDir = join(process.cwd(), 'docker_compiler', this.lang);
		this.uniqueUserSolutionDockerImgDir = join(process.cwd(), '..', 'images', randomUUID());
		this.solutionResultDirInDockerImgDir = join(this.uniqueUserSolutionDockerImgDir, 'result');
		this.solutionResultDirInDocker = join('/opt', 'app', 'result');
		this.solutionResultDirInHostFS = join(process.cwd(), '..', 'results', this.lang, randomUUID());
		this.solutionResultFileInHostFS = join(this.solutionResultDirInHostFS, 'result.txt');
		this.solutionFileName = `solution.${this.lang}`;
		this.solutionFilePath = join(this.uniqueUserSolutionDockerImgDir, this.solutionFileName);

		this.testcasesInputsJSON = JSON.stringify(this.problem.inputs);
		this.testcasesOutputsJSON = JSON.stringify(this.problem.outputs);
		this.testcasesInputsFilePath = join(
			this.uniqueUserSolutionDockerImgDir,
			'testcasesInputs.json',
		);
		this.testcasesOutputsFilePath = join(
			this.uniqueUserSolutionDockerImgDir,
			'testcasesOutputs.json',
		);
	}

	private async prepareEnv(): Promise<void> {
		await fsp.mkdir(this.uniqueUserSolutionDockerImgDir, { recursive: true });
		await fsp.cp(this.dockerCompilerDir, this.uniqueUserSolutionDockerImgDir, { recursive: true });
		await fsp.mkdir(this.solutionResultDirInDockerImgDir, { recursive: true });
		await fsp.mkdir(this.solutionResultDirInHostFS, { recursive: true });

		await fsp.writeFile(this.testcasesInputsFilePath, this.testcasesInputsJSON);
		await fsp.writeFile(this.testcasesOutputsFilePath, this.testcasesOutputsJSON);
		await fsp.writeFile(this.solutionFilePath, Buffer.from(this.code.data));
	}

	private async clear(): Promise<void> {
		await fsp.rm(this.uniqueUserSolutionDockerImgDir, { recursive: true, force: true });
		await fsp.rm(this.solutionResultDirInHostFS, { recursive: true, force: true });
	}

	public async compile(): Promise<ResponseCompilerDto> {
		await this.prepareEnv();
		return new Promise((resolve, reject) => {
			const logData: Buffer[] = []; // currently unused in response
			const errData: Buffer[] = [];

			const dockerBuild = spawn('docker', [
				'build',
				this.uniqueUserSolutionDockerImgDir,
				'-t',
				this.imageName,
			]);

			dockerBuild.on('exit', () => {
				const dockerRun = spawn('docker', [
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
						this.result = new ResponseCompilerDto(Verdict.Error, modifiedLogs);
					} else {
						const logs = Buffer.concat(logData).toString();
						const [resultData, runTime] = (
							await fsp.readFile(this.solutionResultFileInHostFS, 'utf-8')
						).split('\n');
						const verdict = resultData.includes(Verdict.Accepted)
							? Verdict.Accepted
							: Verdict.WrongAnswer;
						this.result = new ResponseCompilerDto(verdict, logs, runTime);
					}
					resolve(this.result);

					const rmDocContainer = spawn('docker', ['rm', this.containerName]);
					rmDocContainer.on('exit', () => spawn('docker', ['rmi', this.imageName]));

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
