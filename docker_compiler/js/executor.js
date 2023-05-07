const fs = require('fs');
const perf_hooks = require('perf_hooks');

const solver = perf_hooks.performance.timerify(require('./solution.js'));

const performanceObserver = new perf_hooks.PerformanceObserver((items, observer) => {
	const entry = items.getEntriesByType('function').pop();
	process.stdout.write('Runtime:' + entry.duration.toFixed(3));
	observer.disconnect();
});
performanceObserver.observe({ entryTypes: ['function'] });

const inputData = fs.readFileSync('testcasesInputs.json', 'utf-8');
const outputData = fs.readFileSync('testcasesOutputs.json', 'utf-8');

const inputs = JSON.parse(inputData);
const outputs = JSON.parse(outputData);

const validate = () => {
	let count = 0;
	const inval = Object.values(inputs);
	const outval = Object.values(outputs);
	for (let i = 0; i < inval.length; i++) {
		const result = solver(inval[i]);
		if (result?.toString() === outval[i].toString()) count++;
		else {
			process.stdout.write(`Wrong answer - Input: ${inval[i]} | Expected output: ${outval[i]}\n`);
			return;
		}
	}
	if (count === inval.length) process.stdout.write('Accepted\n');
	return;
};

validate();
