import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
       const hashedToken = await bcryptjs.hash(userId.toString(), 10);
       const hashedEmail = await bcryptjs.hash(email.toString(), 10);
       
       if (emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
       } else if (emailType === "RESET"){
        await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedEmail, forgotPasswordTokenExpiry: Date.now() + 3600000})
       }
       
       var transporter = nodemailer.createTransport({
            host: "live.smtp.mailtrap.io",
            port: 587,
            auth: {
                user: "api",
                pass: process.env.NODE_MAILER_SECRET_PR!
            }
        });

        const info = await transporter.sendMail({
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Email Verification":"Password Reset Request", // Subject line
            html: `<p>Click <a href="${process.env.domain}/${emailType === "VERIFY" ? 'verifyemail' : 'resetpassword'}?token=${emailType === "VERIFY" ? hashedToken : hashedEmail}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
        });

        return info;

    } catch (error:any) {
        throw new Error(error.message)
    }
}