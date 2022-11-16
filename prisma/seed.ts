// import { Prisma, PrismaClient } from '@prisma/client';

// // initialize Prisma Client
// const prisma = new PrismaClient();

// async function main(): Promise<void> {
// 	const input = {
// 		input1: [1, 2],
// 		input2: [1, 3],
// 	} as Prisma.JsonObject;

// 	const output = {
// 		output1: [3],
// 		output2: [4],
// 	} as Prisma.JsonObject;

// 	const problem1 = await prisma.problem.upsert({
// 		where: { title: 'Four sum' },
// 		update: {},
// 		create: {
// 			title: 'Sum of two',
// 			description: 'You need to add two given number a and b.',
// 			difficulty: 'Easy',
// 			solution: 'a + b.',
// 			constraints: ['a > b', 'b == 0'],
// 		},
// 	});

// 	console.log({ problem1 });
// }

// // execute the main function
// main()
// 	.catch((e) => {
// 		console.error(e);
// 		process.exit(1);
// 	})
// 	.finally(async () => {
// 		// close Prisma Client at the end
// 		await prisma.$disconnect();
// 	});
