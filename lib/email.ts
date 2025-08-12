import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: `"Badal Kumar" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
};

export const sendContactConfirmation = async (email: string, name: string) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Thank you for contacting me!</h2>
      <p>Hi ${name},</p>
      <p>I've received your message and will get back to you within 24 hours.</p>
      <p>Best regards,<br>Badal Kumar</p>
    </div>
  `;
  return sendEmail(email, 'Message Received - Badal Kumar', html);
};

export const sendServiceRequestConfirmation = async (email: string, name: string, service: string) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Service Request Received</h2>
      <p>Hi ${name},</p>
      <p>Thank you for your interest in my <strong>${service}</strong> services.</p>
      <p>I'll review your requirements and get back to you with a detailed proposal within 48 hours.</p>
      <p>Best regards,<br>Badal Kumar</p>
    </div>
  `;
  return sendEmail(email, 'Service Request Received - Badal Kumar', html);
};

export const sendNewsletterWelcome = async (email: string, name?: string) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Welcome to my Newsletter!</h2>
      <p>Hi ${name || 'there'},</p>
      <p>Thank you for subscribing to my newsletter. You'll receive updates about:</p>
      <ul>
        <li>Latest blog posts and tutorials</li>
        <li>New projects and case studies</li>
        <li>Tech insights and tips</li>
      </ul>
      <p>Best regards,<br>Badal Kumar</p>
    </div>
  `;
  return sendEmail(email, 'Welcome to my Newsletter - Badal Kumar', html);
};