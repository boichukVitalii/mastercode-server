'use strict';

const fs = require('node:fs');
const perf_hooks = require('node:perf_hooks');
const { join } = require('node:path');

const RESULT_FILE_PATH = join('result', 'result.txt');

const solver = perf_hooks.performance.timerify(require('./solution.js'));

const performanceObserver = new perf_hooks.PerformanceObserver((items, observer) => {
	const entry = items.getEntriesByType('function').pop();
	fs.appendFileSync(RESULT_FILE_PATH, entry.duration.toString());
	observer.disconnect();
});
performanceObserver.observe({ entryTypes: ['function'] });

const inputData = fs.readFileSync('testcasesInputs.json', 'utf-8');
const outputData = fs.readFileSync('testcasesOutputs.json', 'utf-8');

const inputs = JSON.parse(inputData);
const outputs = JSON.parse(outputData);

const validate = (inputs, outputs) => {
	const inval = Object.values(inputs);
	const outval = Object.values(outputs);
	for (let i = 0; i < inval.length; i++) {
		const result = solver(inval[i]);
		if (result?.toString() !== outval[i].toString()) {
			const data = `Incorrect\nInput: ${inval[i]} | Expected output: ${outval[i]}\n`;
			fs.writeFileSync(RESULT_FILE_PATH, data);
			return;
		}
	}
	fs.writeFileSync(RESULT_FILE_PATH, 'Correct\n\n');
	return;
};
validate(inputs, outputs);
