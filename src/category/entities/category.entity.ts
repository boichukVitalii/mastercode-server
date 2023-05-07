import { Problem } from 'src/problem/entities/problem.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { length: 254, unique: true })
	name: string;

	@Column('text', { nullable: true })
	additional_info?: string | null;

	@OneToMany(() => Problem, (problem) => problem.category)
	problems: Problem[];
}
