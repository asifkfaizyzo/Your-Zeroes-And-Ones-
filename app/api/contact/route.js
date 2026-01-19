// app/api/contact/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { contactLimiter } from '@/lib/rateLimit';

// HTML escape function to prevent XSS
function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, char => map[char]);
}

function sanitizeInput(input, maxLength = 1000) {
  if (typeof input !== 'string') return '';
  return input.trim().substring(0, maxLength);
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) && email.length <= 254;
}

export async function POST(request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    const { success } = contactLimiter.check(ip);
    if (!success) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Sanitize inputs
    const name = sanitizeInput(body.name, 100);
    const email = sanitizeInput(body.email, 254);
    const message = sanitizeInput(body.message, 5000);
    const recaptchaToken = body.recaptchaToken;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification required' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token with Google
    const recaptchaResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        }),
      }
    );

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Escape HTML for email content (XSS prevention)
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Verify transporter
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('Email transporter verification failed');
      return NextResponse.json(
        { error: 'Email service temporarily unavailable.' },
        { status: 503 }
      );
    }

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission from ${safeName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #20427f; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .field-label { font-weight: bold; color: #20427f; }
            .footer { text-align: center; margin-top: 20px; padding: 20px; background: #f0f0f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="field-label">Name:</span> ${safeName}
              </div>
              <div class="field">
                <span class="field-label">Email:</span> 
                <a href="mailto:${safeEmail}">${safeEmail}</a>
              </div>
              <div class="field">
                <span class="field-label">Message:</span>
                <p>${safeMessage.replace(/\n/g, '<br>')}</p>
              </div>
              <div class="field">
                <span class="field-label">Submitted At:</span> 
                ${new Date().toLocaleString('en-US', { 
                  timeZone: 'Asia/Kolkata',
                  dateStyle: 'full', 
                  timeStyle: 'long' 
                })}
              </div>
              <div class="field">
                <span class="field-label">IP Address:</span> ${escapeHtml(ip)}
              </div>
            </div>
            <div class="footer">
              <p>This message was sent from your website contact form.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Auto-reply to user
    const userMailOptions = {
      from: process.env.EMAIL_FROM,
      to: email, // Use original (not escaped) for actual sending
      subject: 'Thank you for contacting Your Zeros and Ones',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #20427f; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .footer { text-align: center; margin-top: 20px; padding: 20px; background: #f0f0f0; }
            .contact-info { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #20427f; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Contacting Us!</h1>
            </div>
            <div class="content">
              <p>Dear <strong>${safeName}</strong>,</p>
              
              <p>Thank you for reaching out to <strong>Your Zeros and Ones</strong>. We have received your message and our team will get back to you within 24 hours.</p>
              
              <div class="contact-info">
                <h3>Your Message:</h3>
                <p>${safeMessage.replace(/\n/g, '<br>')}</p>
              </div>
              
              <p><strong>Business Hours:</strong><br>
                 Monday - Friday: 9:00 AM - 6:00 PM<br>
                 Saturday: 10:00 AM - 4:00 PM<br>
                 Sunday: Closed
              </p>
              
              <p><strong>Contact Information:</strong><br>
                 Phone: +91 96053 05453<br>
                 Email: info@yourzerosandones.com<br>
                 Address: 1st floor, Valentine Estate, Palachuvadu, Kakkanad, Kochi - Kerala 682030
              </p>
            </div>
            <div class="footer">
              <p>Best regards,<br><strong>The Your Zeros and Ones Team</strong></p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    return NextResponse.json(
      { message: 'Message sent successfully! We have sent a confirmation email to your inbox.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error.message);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}