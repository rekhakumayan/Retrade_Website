const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
    },
});

module.exports = async ({ to, subject, html }) => {
    await transporter.sendMail({
        from: '"MarketNest" <no-reply@marketnest.com>',
        to,
        subject,
        html,
    });
};