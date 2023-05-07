export const emailConfirmationHTML = (url: string): string => {
	const html = `<h2>Welcome to the Mastercode.</h2>
								<p>Please confirm your email by clicking on the following link</p>
								<a href=${url}>Click here</a>`;
	return html;
};

export const passwordResetHTML = (url: string): string => {
	const html = `<h2>Password reset</h2>
								<p>Reset your password by clicking on the following link</p>
								<a href=${url}>Click here</a>`;
	return html;
};
