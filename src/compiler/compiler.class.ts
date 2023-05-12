import { CodeType } from './dto/compiler.dto';
import { ResponseCompilerDto, Verdict } from './dto/response-compiler.dto';
import { Problem } from 'src/problem/entities/problem.entity';
import { TLanguage } from 'src/user/entities/user-solved-problem.entity';

import { randomUUID } from 'node:crypto';
import { writeFileSync, mkdirSync, readFileSync, cpSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { spawn } from 'node:child_process';

export class Compiler {
	private readonly code: CodeType;
	private readonly lang: TLanguage;
	private readonly problem: Problem;
	private readonly imageName: string;
	private readonly containerName: string;
	private readonly dockerCompilerDir: string;
	private readonly solutionResultDir: string;
	private readonly solutionFileName: string;
	private readonly solutionFilePath: string;
	private readonly testcaseInputsJSON: string;
	private readonly testcaseOutputsJSON: string;
	private readonly testcasesInputsFilePath: string;
	private readonly testcasesOutputsFilePath: string;
	private readonly uniqueUserSolutionDir: string;
	private result: ResponseCompilerDto;

	constructor(code: CodeType, lang: TLanguage, problem: Problem) {
		this.code = code;
		this.lang = lang;
		this.problem = problem;

		this.imageName = randomUUID();
		this.containerName = randomUUID();

		this.dockerCompilerDir = join(process.cwd(), 'docker_compiler', this.lang);
		this.solutionResultDir = join(process.cwd(), '..', 'results', this.lang, randomUUID());
		this.solutionFileName = `solution.${this.lang}`;

		this.uniqueUserSolutionDir = join(process.cwd(), '..', 'images', randomUUID());

		this.solutionFilePath = join(this.uniqueUserSolutionDir, this.solutionFileName);

		this.testcaseInputsJSON = JSON.stringify(this.problem.inputs);
		this.testcaseOutputsJSON = JSON.stringify(this.problem.outputs);

		this.testcasesInputsFilePath = join(this.uniqueUserSolutionDir, 'testcasesInputs.json');
		this.testcasesOutputsFilePath = join(this.uniqueUserSolutionDir, 'testcasesOutputs.json');
	}

	private prepareEnv(): void {
		mkdirSync(this.uniqueUserSolutionDir, { recursive: true });
		cpSync(this.dockerCompilerDir, this.uniqueUserSolutionDir, { recursive: true });

		writeFileSync(this.testcasesInputsFilePath, this.testcaseInputsJSON);
		writeFileSync(this.testcasesOutputsFilePath, this.testcaseOutputsJSON);
		writeFileSync(this.solutionFilePath, Buffer.from(this.code.data));

		mkdirSync(join(this.uniqueUserSolutionDir, 'result'), { recursive: true });

		mkdirSync(this.solutionResultDir, { recursive: true });
	}

	private clear(): void {
		rmSync(this.uniqueUserSolutionDir, { recursive: true, force: true });
		rmSync(this.solutionResultDir, { recursive: true, force: true });
	}

	public compile(): Promise<ResponseCompilerDto> {
		this.prepareEnv();
		return new Promise((resolve, reject) => {
			const data: Buffer[] = []; // currently unused in response
			const errData: Buffer[] = [];

			const dockerBuild = spawn('docker', [
				'build',
				this.uniqueUserSolutionDir,
				'-t',
				this.imageName,
			]);

			dockerBuild.on('exit', () => {
				const dockerRun = spawn('docker', [
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
						this.result = new ResponseCompilerDto(Verdict.Error, modifiedLogs);
					} else {
						const [resultData, runTime] = readFileSync(
							`${this.solutionResultDir}/result.txt`,
							'utf-8',
						).split('\n');
						const verdict = resultData.includes(Verdict.Accepted)
							? Verdict.Accepted
							: Verdict.WrongAnswer;
						this.result = new ResponseCompilerDto(verdict, resultData, runTime);
					}

					resolve(this.result);

					const rmDocContainer = spawn('docker', ['rm', this.containerName]);
					rmDocContainer.on('exit', () => spawn('docker', ['rmi', this.imageName]));

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
