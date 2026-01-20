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

// Verify reCAPTCHA v3 token
async function verifyRecaptchaV3(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not configured');
    return { success: false, score: 0, error: 'Server configuration error' };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json();
    
    // Log for debugging (remove in production or use proper logging)
    console.log('reCAPTCHA v3 verification:', {
      success: data.success,
      score: data.score,
      action: data.action,
      hostname: data.hostname,
      challenge_ts: data.challenge_ts,
      errors: data['error-codes'] || []
    });

    return data;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, score: 0, error: 'Verification request failed' };
  }
}

// Get score status for email display
function getScoreStatus(score) {
  if (score >= 0.7) return { label: 'High', color: '#16a34a', bg: '#dcfce7' };
  if (score >= 0.5) return { label: 'Medium', color: '#ca8a04', bg: '#fef9c3' };
  if (score >= 0.3) return { label: 'Low', color: '#ea580c', bg: '#ffedd5' };
  return { label: 'Very Low', color: '#dc2626', bg: '#fee2e2' };
}

export async function POST(request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    const { success: rateLimitSuccess } = contactLimiter.check(ip);
    if (!rateLimitSuccess) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Sanitize inputs
    const name = sanitizeInput(body.name, 100);
    const email = sanitizeInput(body.email, 254);
    const phone = sanitizeInput(body.phone, 20);
    const message = sanitizeInput(body.message, 5000);
    const recaptchaToken = body.recaptchaToken;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Validate reCAPTCHA token exists
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification is required.' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA v3 token with Google
    const recaptchaResult = await verifyRecaptchaV3(recaptchaToken);

    // Check if verification was successful
    if (!recaptchaResult.success) {
      console.error('reCAPTCHA verification failed:', recaptchaResult['error-codes']);
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please refresh the page and try again.' },
        { status: 400 }
      );
    }

    // Check score threshold (v3 specific)
    // Score ranges from 0.0 (likely bot) to 1.0 (likely human)
    // Recommended threshold: 0.5, adjust based on your needs
    const SCORE_THRESHOLD = 0.5;
    
    if (recaptchaResult.score < SCORE_THRESHOLD) {
      console.warn(`Low reCAPTCHA score: ${recaptchaResult.score} for IP: ${ip}`);
      return NextResponse.json(
        { error: 'Verification failed. Please try again or contact us directly at info@yourzerosandones.com' },
        { status: 400 }
      );
    }

    // Optional: Verify action matches what we expect
    if (recaptchaResult.action && recaptchaResult.action !== 'contact_form') {
      console.warn(`Unexpected reCAPTCHA action: ${recaptchaResult.action}`);
      // You can choose to reject or just log this
    }

    // Escape HTML for email content (XSS prevention)
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message);
    const safeIp = escapeHtml(ip);

    // Get score status for display
    const scoreStatus = getScoreStatus(recaptchaResult.score);

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
      console.error('Email transporter verification failed:', verifyError.message);
      return NextResponse.json(
        { error: 'Email service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `📬 New Contact Form Submission from ${safeName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #203E7F 0%, #0891b2 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 14px; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
            .field { margin-bottom: 20px; background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #0891b2; }
            .field-label { font-weight: 600; color: #203E7F; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
            .field-value { color: #374151; font-size: 15px; }
            .field-value a { color: #0891b2; text-decoration: none; }
            .field-value a:hover { text-decoration: underline; }
            .message-box { background: #f0f9ff; padding: 20px; border-radius: 8px; border: 1px solid #bae6fd; }
            .message-box p { margin: 0; white-space: pre-wrap; word-wrap: break-word; }
            .meta { display: flex; gap: 20px; flex-wrap: wrap; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
            .meta-item { font-size: 12px; color: #6b7280; }
            .score-badge { display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
            .footer { text-align: center; padding: 20px; background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px; }
            .footer p { margin: 0; font-size: 12px; color: #6b7280; }
            .action-buttons { margin-top: 20px; text-align: center; }
            .btn { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #203E7F 0%, #0891b2 100%); color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 5px; }
            .btn:hover { opacity: 0.9; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📬 New Contact Form Submission</h1>
              <p>From Your Zeros and Ones Website</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">👤 Name</div>
                <div class="field-value">${safeName}</div>
              </div>
              
              <div class="field">
                <div class="field-label">📧 Email</div>
                <div class="field-value">
                  <a href="mailto:${safeEmail}">${safeEmail}</a>
                </div>
              </div>
              
              ${safePhone ? `
              <div class="field">
                <div class="field-label">📱 Phone</div>
                <div class="field-value">
                  <a href="tel:${safePhone}">${safePhone}</a>
                </div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="field-label">💬 Message</div>
                <div class="message-box">
                  <p>${safeMessage.replace(/\n/g, '<br>')}</p>
                </div>
              </div>
              
              <div class="action-buttons">
                <a href="mailto:${safeEmail}?subject=Re: Your inquiry to Your Zeros and Ones" class="btn">
                  Reply to ${safeName}
                </a>
              </div>
              
              <div class="meta">
                <div class="meta-item">
                  <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { 
                    timeZone: 'Asia/Kolkata',
                    dateStyle: 'full', 
                    timeStyle: 'long' 
                  })} IST
                </div>
                <div class="meta-item">
                  <strong>IP Address:</strong> ${safeIp}
                </div>
                <div class="meta-item">
                  <strong>reCAPTCHA Score:</strong> 
                  <span class="score-badge" style="background: ${scoreStatus.bg}; color: ${scoreStatus.color};">
                    ${recaptchaResult.score.toFixed(2)} (${scoreStatus.label})
                  </span>
                </div>
                ${recaptchaResult.action ? `
                <div class="meta-item">
                  <strong>Action:</strong> ${escapeHtml(recaptchaResult.action)}
                </div>
                ` : ''}
              </div>
            </div>
            <div class="footer">
              <p>This message was sent from your website contact form.</p>
              <p style="margin-top: 5px;">© ${new Date().getFullYear()} Your Zeros and Ones</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission
============================

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}

---
Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST
IP Address: ${ip}
reCAPTCHA Score: ${recaptchaResult.score.toFixed(2)} (${scoreStatus.label})
      `.trim(),
    };

    // Auto-reply to user
    const userMailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: '✅ Thank you for contacting Your Zeros and Ones!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f3f4f6; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #203E7F 0%, #0891b2 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 28px; }
            .header p { margin: 15px 0 0 0; opacity: 0.9; font-size: 16px; }
            .content { background: #ffffff; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; }
            .greeting { font-size: 18px; margin-bottom: 20px; }
            .message-box { background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0891b2; margin: 25px 0; }
            .message-box h3 { margin: 0 0 10px 0; color: #203E7F; font-size: 14px; }
            .message-box p { margin: 0; color: #374151; font-size: 14px; white-space: pre-wrap; }
            .info-section { margin: 30px 0; }
            .info-section h3 { color: #203E7F; font-size: 16px; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
            .info-grid { display: grid; gap: 15px; }
            .info-item { display: flex; align-items: flex-start; gap: 12px; }
            .info-icon { width: 40px; height: 40px; background: linear-gradient(135deg, #203E7F 0%, #0891b2 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
            .info-icon svg { width: 20px; height: 20px; fill: white; }
            .info-text { flex: 1; }
            .info-text strong { display: block; color: #203E7F; font-size: 13px; margin-bottom: 2px; }
            .info-text span { color: #6b7280; font-size: 14px; }
            .info-text a { color: #0891b2; text-decoration: none; }
            .info-text a:hover { text-decoration: underline; }
            .cta { text-align: center; margin: 30px 0; }
            .cta a { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #203E7F 0%, #0891b2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; }
            .cta a:hover { opacity: 0.9; }
            .social { text-align: center; margin: 25px 0; }
            .social a { display: inline-block; width: 36px; height: 36px; background: #f3f4f6; border-radius: 50%; margin: 0 5px; line-height: 36px; }
            .social a:hover { background: #e5e7eb; }
            .footer { text-align: center; padding: 30px; background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px; }
            .footer p { margin: 5px 0; font-size: 13px; color: #6b7280; }
            .footer .company { font-weight: 600; color: #203E7F; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You! 🙏</h1>
              <p>We've received your message</p>
            </div>
            <div class="content">
              <p class="greeting">Dear <strong>${safeName}</strong>,</p>
              
              <p>Thank you for reaching out to <strong>Your Zeros and Ones</strong>. We appreciate you taking the time to contact us.</p>
              
              <p>Our team has received your message and will get back to you within <strong>24-48 business hours</strong>.</p>
              
              <div class="message-box">
                <h3>📝 Your Message:</h3>
                <p>${safeMessage.replace(/\n/g, '<br>')}</p>
              </div>
              
              <div class="info-section">
                <h3>📞 Contact Information</h3>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-icon">
                      <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    </div>
                    <div class="info-text">
                      <strong>Phone</strong>
                      <span><a href="tel:+919605305453">+91 96053 05453</a></span>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-icon">
                      <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    </div>
                    <div class="info-text">
                      <strong>Email</strong>
                      <span><a href="mailto:info@yourzerosandones.com">info@yourzerosandones.com</a></span>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-icon">
                      <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    </div>
                    <div class="info-text">
                      <strong>Address</strong>
                      <span>1st floor, Valentine Estate, Palachuvadu, Kakkanad, Kochi - Kerala 682030</span>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-icon">
                      <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                    </div>
                    <div class="info-text">
                      <strong>Business Hours</strong>
                      <span>Mon-Fri: 9 AM - 6 PM | Sat: 10 AM - 4 PM</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="cta">
                <a href="https://yourzerosandones.com">Visit Our Website →</a>
              </div>
            </div>
            <div class="footer">
              <p class="company">Your Zeros and Ones</p>
              <p>Digital Solutions for Modern Businesses</p>
              <p style="margin-top: 15px;">© ${new Date().getFullYear()} Your Zeros and Ones. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Dear ${name},

Thank you for reaching out to Your Zeros and Ones. We appreciate you taking the time to contact us.

Our team has received your message and will get back to you within 24-48 business hours.

Your Message:
${message}

---

Contact Information:
Phone: +91 96053 05453
Email: info@yourzerosandones.com
Address: 1st floor, Valentine Estate, Palachuvadu, Kakkanad, Kochi - Kerala 682030

Business Hours:
Monday - Friday: 9:00 AM - 6:00 PM
Saturday: 10:00 AM - 4:00 PM
Sunday: Closed

Best regards,
The Your Zeros and Ones Team

© ${new Date().getFullYear()} Your Zeros and Ones. All rights reserved.
      `.trim(),
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    console.log(`Contact form submitted successfully: ${email}, Score: ${recaptchaResult.score}`);

    return NextResponse.json(
      { 
        success: true,
        message: 'Message sent successfully! We have sent a confirmation email to your inbox.' 
      },
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