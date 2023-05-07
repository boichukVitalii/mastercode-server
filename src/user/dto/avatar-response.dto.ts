import { Exclude } from 'class-transformer';
import { File } from 'src/file/entities/file.entity';

export class AvatarResponseDto implements File {
	id: string;
	filename: string;
	@Exclude() path: string;
	mimetype: string;

	constructor(partial: Partial<File>) {
		Object.assign(this, partial);
	}
}
