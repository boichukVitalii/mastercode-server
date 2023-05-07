import { File } from 'src/file/entities/file.entity';
export declare class AvatarResponseDto implements File {
    id: string;
    filename: string;
    path: string;
    mimetype: string;
    constructor(partial: Partial<File>);
}
