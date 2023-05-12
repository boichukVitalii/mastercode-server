const fs = require('fs');
const perf_hooks = require('perf_hooks');

const solver = perf_hooks.performance.timerify(require('./solution.js'));

const performanceObserver = new perf_hooks.PerformanceObserver((items, observer) => {
	const entry = items.getEntriesByType('function').pop();
	fs.appendFileSync('result/result.txt', entry.duration.toFixed(3));
	observer.disconnect();
});
performanceObserver.observe({ entryTypes: ['function'] });

const inputData = fs.readFileSync('testcasesInputs.json', 'utf-8');
const outputData = fs.readFileSync('testcasesOutputs.json', 'utf-8');

const inputs = JSON.parse(inputData);
const outputs = JSON.parse(outputData);

// const validate = () => {
// 	let count = 0;
// 	const inval = Object.values(inputs);
// 	const outval = Object.values(outputs);
// 	for (let i = 0; i < inval.length; i++) {
// 		const result = solver(inval[i]);
// 		if (result?.toString() === outval[i].toString()) count++;
// 		else {
// 			process.stdout.write(`Wrong answer - Input: ${inval[i]} | Expected output: ${outval[i]}\n`);
// 			return;
// 		}
// 	}
// 	if (count === inval.length) process.stdout.write('Accepted\n');
// 	return;
// };

const validate = () => {
	const inval = Object.values(inputs);
	const outval = Object.values(outputs);
	for (let i = 0; i < inval.length; i++) {
		const result = solver(inval[i]);
		if (result?.toString() !== outval[i].toString()) {
			const data = `Wrong answer - Input: ${inval[i]} | Expected output: ${outval[i]}\n`;
			fs.writeFileSync('result/result.txt', data);
			return;
		}
	}
	fs.writeFileSync('result/result.txt', 'Accepted');
	return;
};

validate();
