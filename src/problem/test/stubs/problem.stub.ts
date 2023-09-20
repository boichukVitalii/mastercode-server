import { DeepPartial } from 'typeorm';
import { Problem } from '../../entities/problem.entity';

export const createProblemStub = (): DeepPartial<Problem> => {
	return {
		title: 'Test problem',
		description: 'Test problem description',
		difficulty: 'easy',
		solution: 'Information on how to solve this problem',
		constraints: ['a > b'],
		category_id: 'Must be replaced with an existing category ID',
		inputs: { input1: ['abc'] },
		outputs: { output1: ['abc'] },
	};
};
