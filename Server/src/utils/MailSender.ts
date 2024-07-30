import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const username: string | undefined = process.env.USER;
const app_password: string | undefined = process.env.PASS;

if (!username || !app_password) {
    throw new Error('Missing environment variables for email configuration.');
}

console.log('Username:', username);
console.log('App Password:', app_password);


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "samsb2609@gmail.com",
        pass: "oldofdeusadmodrz"
    },
    logger: true,
    debug: true,
});

const sendOTP = async (receiver: string, otp: string) => {
    try {
        const info = await transporter.sendMail({
            from: `"Sammy from app" <${username}>`,
            to: receiver,
            subject: 'Your OTP for Verification',
            text: `Your OTP is: ${otp}`,
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export default sendOTP;
