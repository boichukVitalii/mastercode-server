'use strict';

const fs = require('fs');
const perf_hooks = require('perf_hooks');
const { join } = require('path');

const RESULT_FILE_PATH = join('result', 'result.txt');

const solver = perf_hooks.performance.timerify(require('./solution.js'));

const performanceObserver = new perf_hooks.PerformanceObserver((items, observer) => {
	const entry = items.getEntriesByType('function').pop();
	fs.appendFileSync(RESULT_FILE_PATH, entry.duration.toFixed(3));
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
	// const timeoutId = setTimeout(() => {
	// 	fs.writeFileSync(RESULT_FILE_PATH, 'Timeout')
	// 	process.exit(1);
	// }, 35000)
	for (let i = 0; i < inval.length; i++) {
		const result = solver(inval[i]);
		if (result?.toString() !== outval[i].toString()) {
			// clearTimeout(timeoutId);
			const data = `Wrong answer - Input: ${inval[i]} | Expected output: ${outval[i]}\n`;
			fs.writeFileSync(RESULT_FILE_PATH, data);
			return;
		}
	}
	// clearTimeout(timeoutId);
	fs.writeFileSync(RESULT_FILE_PATH, 'Accepted\n');
	return;
};
validate(inputs, outputs);
