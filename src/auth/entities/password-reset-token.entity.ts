import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('password_reset_token')
export class PasswordResetToken {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => User, (user: User) => user.password_reset_tokens, {
		onDelete: 'CASCADE',
		eager: true,
	})
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column('varchar', { length: 254, unique: true })
	token_hash: string;

	@Column('bigint')
	token_expiry: number;
}
