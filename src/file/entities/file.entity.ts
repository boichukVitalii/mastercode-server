import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('file')
export class File {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { length: 254 })
	filename: string;

	@Column('varchar', { length: 254 })
	path: string;

	@Column('varchar', { length: 12 })
	mimetype: string;
}
