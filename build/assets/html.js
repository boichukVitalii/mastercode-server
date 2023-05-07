"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetHTML = exports.emailConfirmationHTML = void 0;
const emailConfirmationHTML = (url) => {
    const html = `<h2>Welcome to the Mastercode.</h2>
								<p>Please confirm your email by clicking on the following link</p>
								<a href=${url}>Click here</a>`;
    return html;
};
exports.emailConfirmationHTML = emailConfirmationHTML;
const passwordResetHTML = (url) => {
    const html = `<h2>Password reset</h2>
								<p>Reset your password by clicking on the following link</p>
								<a href=${url}>Click here</a>`;
    return html;
};
exports.passwordResetHTML = passwordResetHTML;
//# sourceMappingURL=html.js.map