import Mail from 'nodemailer/lib/mailer';
export declare class EmailService {
    private readonly nodemailerTransport;
    constructor();
    sendMail(options: Mail.Options): Promise<any>;
}
