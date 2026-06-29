import nodemailer from 'nodemailer';
import { config } from '../config/index.js';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.port === 465,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
  connectionTimeout: 5000,
  greetingTimeout: 5000,
  socketTimeout: 5000,
});

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<void> {
  try {
    await transporter.sendMail({
      from: config.email.from,
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error('Email send failed:', err);
  }
}

export function sendVerificationEmail(email: string, token: string): Promise<void> {
  const url = `${config.frontendUrl}/verify-email?token=${token}`;
  return sendEmail({
    to: email,
    subject: 'Verify Your Email - Shodhan AI',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #0a0a1a; color: #f8fafc; padding: 40px 24px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #3b82f6; font-size: 28px; margin: 0;">Shodhan AI</h1>
        </div>
        <h2 style="font-size: 20px; margin: 0 0 8px;">Verify Your Email</h2>
        <p style="color: #94a3b8; margin: 0 0 24px; line-height: 1.6;">
          Thanks for signing up! Click the button below to verify your email address.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${url}" style="display: inline-block; background: #3b82f6; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
            Verify Email
          </a>
        </div>
        <p style="color: #64748b; font-size: 14px; margin: 0;">
          If you didn't create an account, you can safely ignore this email.<br>
          This link expires in 24 hours.
        </p>
      </div>
    `,
  });
}

export function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const url = `${config.frontendUrl}/reset-password?token=${token}`;
  return sendEmail({
    to: email,
    subject: 'Reset Your Password - Shodhan AI',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #0a0a1a; color: #f8fafc; padding: 40px 24px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #3b82f6; font-size: 28px; margin: 0;">Shodhan AI</h1>
        </div>
        <h2 style="font-size: 20px; margin: 0 0 8px;">Reset Your Password</h2>
        <p style="color: #94a3b8; margin: 0 0 24px; line-height: 1.6;">
          You requested a password reset. Click the button below to set a new password.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${url}" style="display: inline-block; background: #3b82f6; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
            Reset Password
          </a>
        </div>
        <p style="color: #64748b; font-size: 14px; margin: 0;">
          If you didn't request this, you can safely ignore this email.<br>
          This link expires in 1 hour.
        </p>
      </div>
    `,
  });
}

export function sendWelcomeEmail(email: string, name: string): Promise<void> {
  return sendEmail({
    to: email,
    subject: 'Welcome to Shodhan AI',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #0a0a1a; color: #f8fafc; padding: 40px 24px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #3b82f6; font-size: 28px; margin: 0;">Shodhan AI</h1>
        </div>
        <h2 style="font-size: 20px; margin: 0 0 8px;">Welcome, ${name}!</h2>
        <p style="color: #94a3b8; margin: 0 0 24px; line-height: 1.6;">
          Your email has been verified. You now have full access to Shodhan AI's platform.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${config.frontendUrl}/dashboard" style="display: inline-block; background: #3b82f6; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
            Go to Dashboard
          </a>
        </div>
      </div>
    `,
  });
}
