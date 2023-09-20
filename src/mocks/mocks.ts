import { Logger, Level } from 'pino';
import logger from '../logger';

const mockLogFunc = (e: any): void => {
	logger.trace(e);
};

const loggerMock: Pick<Logger, Level> = {
	trace: mockLogFunc,
	debug: mockLogFunc,
	info: mockLogFunc,
	warn: mockLogFunc,
	error: mockLogFunc,
	fatal: mockLogFunc,
};
export default loggerMock;
