/// <reference types="node" />
export declare class MFile {
    readonly filename: string;
    readonly mimetype: string;
    readonly buffer: Buffer;
    constructor(filename: string, mimetype: string, buffer: Buffer);
}
