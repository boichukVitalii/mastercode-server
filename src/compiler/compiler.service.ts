import { Injectable } from '@nestjs/common';
import { CreateCompilerDto } from './dto/create-compiler.dto';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { ResponseCompilerDto, Verdict } from './dto/response-compiler.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CompilerService {
	constructor(private readonly prisma: PrismaService) {}

	async compile({ code, lang, problemId }: CreateCompilerDto): Promise<ResponseCompilerDto> {
		const problem = await this.prisma.problem.findUniqueOrThrow({
			where: { id: problemId },
		});

		const testcaseInputsJSON = JSON.stringify(problem.inputs);
		const testcaseOutputsJSON = JSON.stringify(problem.outputs);

		const dockerCompilerDir = join(__dirname, '..', '..', '..', 'docker_compiler', lang);
		const appFileName = `app.${lang}`;
		const appFilePath = join(dockerCompilerDir, appFileName);
		const testcasesInputsFilePath = join(dockerCompilerDir, 'testcasesInputs.json');
		const testcasesOutputsFilePath = join(dockerCompilerDir, 'testcasesOutputs.json');

		writeFileSync(testcasesInputsFilePath, testcaseInputsJSON);
		writeFileSync(testcasesOutputsFilePath, testcaseOutputsJSON);
		writeFileSync(appFilePath, Buffer.from(code.data));

		const imgname = randomUUID();
		const contname = randomUUID();

		return new Promise((resolve, reject) => {
			const dockerBuild = spawn('docker', ['build', dockerCompilerDir, '-t', imgname]);
			const response: ResponseCompilerDto = { logs: '', verdict: Verdict.Error, runTime: null };
			const data = [];
			const errData = [];

			dockerBuild.stdout.on('end', () => {
				const dockerRun = spawn('docker', ['run', '--name', contname, imgname]);

				dockerRun.stdout.on('data', (chunk) => {
					data.push(chunk);
				});

				dockerRun.stdout.on('end', () => {
					if (errData.length) {
						response.runTime = null;
						const logs = Buffer.concat(errData).toString()
						response.logs = logs
							.split('\n')
							.filter((s) => !s.includes('at'))
							.join()
							.replace(/  +/g, ' ');
						response.verdict = Verdict.Error;
					} else {
						const runTimeRegExp = new RegExp(/Runtime:\d*\.\d*/);
						const logs = Buffer.concat(data).toString();
						response.runTime = logs.match(runTimeRegExp)[0].split(':')[1];
						const modifiedLogs = logs
							.replace(runTimeRegExp, '')
							.replace('Accepted', '')
							.replace('Wrong answer - ', '');
						response.logs = modifiedLogs;
						response.verdict =
							logs.includes(Verdict.Accepted) && logs.includes(Verdict.WrongAnswer)
								? Verdict.WrongAnswer
								: logs.includes(Verdict.Accepted)
								? Verdict.Accepted
								: Verdict.WrongAnswer;
					}

					resolve(response);

					const rmDocContainer = spawn('docker', ['rm', contname]);
					rmDocContainer.stdout.on('end', () => spawn('docker', ['rmi', imgname]));
				});

				dockerRun.stderr.on('data', (errChunk) => errData.push(errChunk));

				dockerRun.on('error', (err) => reject(err));
			});

			dockerBuild.stderr.on('data', (errChunk) => reject(errChunk.toString()));

			dockerBuild.on('error', (err) => reject(err));
		});
	}
}
