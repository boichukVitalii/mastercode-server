export class MFile {
	constructor(
		public readonly filename: string,
		public readonly mimetype: string,
		public readonly buffer: Buffer,
	) {}
}
