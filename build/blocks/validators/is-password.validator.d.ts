import { ValidationOptions } from 'class-validator';
export declare function IsPassword(passLength: number, validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
