export const verificationEmailTemplate = (name: string, verificationLink: string) => {
    return `
    <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a1a1a; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">Pana.hub</h1>
        </div>
        
        <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <h2 style="margin-top: 0; color: #111827; font-size: 20px;">Verify your email address</h2>
            <p>Hi ${name},</p>
            <p>Thanks for signing up for <strong>Pana.hub</strong>! To get started, please click the button below to verify your account:</p>
            
            <div style="text-align: center; margin: 35px 0;">
                <a href="${verificationLink}" 
                   style="background-color: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">
                   Verify Email Address
                </a>
            </div>
            
            <p style="font-size: 14px; color: #6b7280;">
                If the button above doesn't work, copy and paste this link into your browser:
                <br />
                <a href="${verificationLink}" style="color: #2563eb; word-break: break-all;">${verificationLink}</a>
            </p>
            
            <hr style="border: 0; border-top: 1px solid #f3f4f6; margin: 25px 0;" />
            
            <p style="font-size: 12px; color: #9ca3af; margin-bottom: 0;">
                This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.
            </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #9ca3af;">
            &copy; 2026 Pana.hub. All rights reserved.
        </div>
    </div>
    `;
};