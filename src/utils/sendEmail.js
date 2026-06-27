import { Resend } from 'resend';
import dotenv from 'dotenv'
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail (to , subject , text){
     const response = await resend.emails.send({
        from: "onboarding@resend.dev",
        to,
        subject,
        text
    });
    return response;
}
