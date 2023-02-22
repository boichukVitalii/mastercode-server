import { randomUUID } from 'node:crypto';
import { CodeType, Language } from './dto/create-compiler.dto';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { ResponseCompilerDto, Verdict } from './dto/response-compiler.dto';
import { Problem } from 'src/problem/entities/problem.entity';

export class Compiler {
	private readonly code: CodeType;
	private readonly lang: Language;
	private readonly problem: Problem;
	private readonly imageName: string;
	private readonly containerName: string;
	private readonly dockerCompilerDir: string;
	private readonly appFileName: string;
	private readonly appFilePath: string;
	private readonly testcaseInputsJSON: string;
	private readonly testcaseOutputsJSON: string;
	private readonly testcasesInputsFilePath: string;
	private readonly testcasesOutputsFilePath: string;
	private readonly result: ResponseCompilerDto = {
		logs: '',
		verdict: Verdict.Error,
		runTime: undefined,
	};

	constructor(code: CodeType, lang: Language, problem: Problem) {
		this.code = code;
		this.lang = lang;
		this.problem = problem;
		this.imageName = randomUUID();
		this.containerName = randomUUID();
		this.dockerCompilerDir = join(process.cwd(), 'docker_compiler', this.lang);
		this.appFileName = `app.${this.lang}`;
		this.appFilePath = join(this.dockerCompilerDir, this.appFileName);
		this.testcaseInputsJSON = JSON.stringify(this.problem.inputs);
		this.testcaseOutputsJSON = JSON.stringify(this.problem.outputs);
		this.testcasesInputsFilePath = join(this.dockerCompilerDir, 'testcasesInputs.json');
		this.testcasesOutputsFilePath = join(this.dockerCompilerDir, 'testcasesOutputs.json');
	}

	private prepareEnv(): void {
		writeFileSync(this.testcasesInputsFilePath, this.testcaseInputsJSON);
		writeFileSync(this.testcasesOutputsFilePath, this.testcaseOutputsJSON);
		writeFileSync(this.appFilePath, Buffer.from(this.code.data));
	}

	//ResponseCompilerDto change
	public compile(): Promise<ResponseCompilerDto> {
		this.prepareEnv();

		return new Promise((resolve, reject) => {
			const dockerBuild = spawn('docker', ['build', this.dockerCompilerDir, '-t', this.imageName]);
			const data: Buffer[] = [];
			const errData: Buffer[] = [];

			dockerBuild.stdout.on('end', () => {
				const dockerRun = spawn('docker', ['run', '--name', this.containerName, this.imageName]);

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
						this.result.verdict = Verdict.Error;
					} else {
						const runTimeRegExp = new RegExp(/Runtime:\d*\.\d*/);
						const logs = Buffer.concat(data).toString();
						// this.result.runTime = logs.match(runTimeRegExp)[0].split(':')[1];
						this.result.runTime = '0.9999';
						const modifiedLogs = logs
							.replace(runTimeRegExp, '')
							.replace('Accepted', '')
							.replace('Wrong answer - ', '');
						this.result.logs = modifiedLogs;
						this.result.verdict =
							logs.includes(Verdict.Accepted) && logs.includes(Verdict.WrongAnswer)
								? Verdict.WrongAnswer
								: logs.includes(Verdict.Accepted)
								? Verdict.Accepted
								: Verdict.WrongAnswer;
					}

					resolve(this.result);

					const rmDocContainer = spawn('docker', ['rm', this.containerName]);
					rmDocContainer.stdout.on('end', () => spawn('docker', ['rmi', this.imageName]));
				});

				dockerRun.stderr.on('data', (errChunk) => errData.push(errChunk));

				dockerRun.on('error', (err) => reject(err));
			});

			dockerBuild.stderr.on('data', (errChunk) => reject(errChunk.toString()));

			dockerBuild.on('error', (err) => reject(err));
		});
	}
}
