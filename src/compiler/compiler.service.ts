import { Injectable } from '@nestjs/common';
import { CreateCompilerDto } from './dto/create-compiler.dto';
import { writeFileSync } from 'node:fs';
import * as path from 'node:path';
import { spawn } from 'node:child_process';
import { ResponseCompilerDto } from './dto/response-compiler.dto';

let c = 0;

@Injectable()
export class CompilerService {
	compile({ code, lang }: CreateCompilerDto): Promise<ResponseCompilerDto> {
		const dockerCompilerDir = path.join(__dirname, '..', '..', '..', 'docker_compiler', lang);
		const appFileName = `app.${lang}`;
		const appFilePath = path.join(dockerCompilerDir, appFileName);

		writeFileSync(appFilePath, code);

		c++;
		const imgname = 'img' + c;
		const contname = 'cont' + c;

		return new Promise((resolve, reject) => {
			const dockerBuild = spawn('docker', ['build', dockerCompilerDir, '-t', imgname]);
			const response: ResponseCompilerDto = {};
			const data = [];
			const errData = [];

			dockerBuild.stdout.on('end', () => {
				const dockerRun = spawn('docker', ['run', '--name', contname, imgname]);

				dockerRun.stdout.on('data', (chunk) => data.push(chunk));

				dockerRun.stdout.on('end', () => {
					const logs = data.length ? data : errData;
					const responseLogs = Buffer.concat(logs).toString();
					response.logs = responseLogs;

					resolve(response);

					const rmDocContainer = spawn('docker', ['rm', contname]);
					rmDocContainer.stdout.on('end', () => spawn('docker', ['rmi', imgname]));
				});

				dockerRun.stderr.on('data', (errChunk) => reject(errChunk.toString()));

				dockerRun.on('error', (err) => reject(err));
			});

			dockerBuild.stderr.on('data', (errChunk) => reject(errChunk.toString()));

			dockerBuild.on('error', (err) => reject(err));
		});
	}
}
