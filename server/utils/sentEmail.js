const nodemailer = require('nodemailer');

const verifmail = async (email, link) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: process.env.HOST,
            port: parseInt(process.env.MAIL_PORT), // Use MAIL_PORT from environment variables
            secure: process.env.SECURE === 'true', // Use SSL/TLS
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD,
            },
        });

        transporter.verify(function(error, success) {
            if (error) {
                console.log("Verification failed:", error);
            } else {
                console.log("SMTP connection is ready to take our messages");
            }
        });

        let info = await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: "Account verification",
            text: "Welcome",
            html: `<div><a href="${link}">Click here to activate your account</a></div>`,
        });

        console.log("Mail sent successfully", info.messageId);
    } catch (error) {
        console.log(error, "mail failed to send");
    }
};

module.exports = verifmail;
