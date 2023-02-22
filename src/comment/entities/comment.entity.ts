import { Problem } from 'src/problem/entities/problem.entity';
import { User } from 'src/user/entities/user.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('comment')
export class Comment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('text')
	text: string;

	@Column('int', { default: 0 })
	thumbs_up: number;

	@ManyToOne(() => User, (user: User) => user.comments)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Problem, (problem) => problem.comments)
	@JoinColumn({ name: 'problem_id' })
	problem: Problem;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
