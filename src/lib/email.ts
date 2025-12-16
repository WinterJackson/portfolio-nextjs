
import nodemailer from 'nodemailer'

const smtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD

const transporter = smtpConfigured ? nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports (587 uses STARTTLS)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
}) : null

export const sendEmail = async (to: string, subject: string, html: string) => {
    // If SMTP is not configured, fall back to console logging in development
    if (!smtpConfigured) {
        if (process.env.NODE_ENV !== 'production') {
            console.log('⚠️ SMTP not configured. Mocking email send.')
            console.log('Missing variables:')
            if (!process.env.SMTP_HOST) console.log('- SMTP_HOST')
            if (!process.env.SMTP_USER) console.log('- SMTP_USER')
            if (!process.env.SMTP_PASSWORD) console.log('- SMTP_PASSWORD')

            console.log(`To: ${to}`)
            console.log(`Subject: ${subject}`)
            console.log('--- Email Content ---')
            console.log(html)
            console.log('---------------------')
            return { messageId: 'mock-id' }
        } else {
            throw new Error('SMTP environment variables are not defined. Cannot send email in production.')
        }
    }

    try {
        if (!transporter) throw new Error('Transporter not initialized')

        const info = await transporter.sendMail({
            from: `"Winter Jackson Admin" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        })
        console.log('Message sent: %s', info.messageId)
        return info
    } catch (error) {
        console.error('Error sending email:', error)
        throw error
    }
}
