"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPassword = void 0;
const class_validator_1 = require("class-validator");
function IsPassword(passLength, validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: 'isPassword',
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value) {
                    const regex = new RegExp(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{${passLength},}$`);
                    return typeof value === 'string' && regex.test(value);
                },
                defaultMessage() {
                    return ('Password must be a string, containing upper and lower case letters ' +
                        'from english alphabet, numbers and special characters like [#?!@$%^&*-] ' +
                        'and have a length minimum ' +
                        `${passLength} characters`);
                },
            },
        });
    };
}
exports.IsPassword = IsPassword;
//# sourceMappingURL=is-password.validator.js.map