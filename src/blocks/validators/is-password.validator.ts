import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPassword(passLength: number, validationOptions?: ValidationOptions) {
	return (object: object, propertyName: string): void => {
		registerDecorator({
			name: 'isPassword',
			target: object.constructor,
			propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: any) {
					const regex = new RegExp(
						`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{${passLength},}$`,
					);
					return typeof value === 'string' && regex.test(value);
				},
				defaultMessage(): string {
					return (
						'Password must be a string, containing upper and lower case letters ' +
						'from english alphabet, numbers and special characters like [#?!@$%^&*-] ' +
						'and have a length minimum ' +
						`${passLength} characters`
					);
				},
			},
		});
	};
}
