import { Resend } from 'resend';
import { verificationEmailTemplate } from './email.template.js';
import { ENV } from '../../infrastructure/env.js';

const resend = new Resend(process.env.RESEND_API_KEY);


export class EmailService {
    static async sendVerificationLink(to: string, name: string, token: string) {
        // Point directly to the backend route we just created
        const backendUrl = ENV.BACKEND_URL
        const verificationLink = `${backendUrl}/auth/verify-email/${token}`;

        try {
            await resend.emails.send({
                from: 'Pana.hub <onboarding@resend.dev>',
                to,
                subject: 'Confirm your Pana.hub Registration',
                html: verificationEmailTemplate(name, verificationLink),
            });
            return true;
        } catch (error) {
            console.error("Resend delivery failed:", error);
            return false;
        }
    }
}