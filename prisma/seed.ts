import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main(): Promise<void> {
	// create two dummy articles
	const problem1 = await prisma.problem.upsert({
		where: { title: 'Four sum' },
		update: {},
		create: {
			title: 'Four sum',
			description: 'Some dummy information,Some dummy information,Some dummy information.',
			difficulty: 'Easy',
			solution: 'This a solution.',
			constraints: ['a < b', 'b == 0'],
		},
	});

	const problem2 = await prisma.problem.upsert({
		where: { title: "What's new in Prisma? (Q1/22)" },
		update: {},
		create: {
			title: 'Five sum',
			description: 'Some dummy2 information,Some dummy2 information,Some dummy2 information.',
			difficulty: 'Hard',
			solution: 'This a solution2.',
			constraints: ['a > b', 'a == 0'],
		},
	});

	console.log({ problem1, problem2 });
}

// execute the main function
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		// close Prisma Client at the end
		await prisma.$disconnect();
	});
