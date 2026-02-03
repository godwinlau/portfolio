import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function getAutoReplyHtml(name: string) {
  const displayName = name || 'there';
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Hey ${displayName}, got your message!</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    :root { color-scheme: light dark; }
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
    a { color: #FF5C00; text-decoration: none; }
    a:hover { color: #FF7A33; }

    /* Light mode (default) */
    .body-bg { background-color: #f5f5f5 !important; }
    .card-bg { background-color: #ffffff !important; }
    .card-border { border-color: #e5e5e5 !important; }
    .divider { background-color: #e5e5e5 !important; }
    .text-primary { color: #1a1a1a !important; }
    .text-secondary { color: #666666 !important; }
    .text-muted { color: #999999 !important; }
    .footer-link { color: #888888 !important; }
    .footer-text { color: #aaaaaa !important; }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      .body-bg { background-color: #0a0a0a !important; }
      .card-bg { background-color: #141414 !important; }
      .card-border { border-color: #222222 !important; }
      .divider { background-color: #222222 !important; }
      .text-primary { color: #ffffff !important; }
      .text-secondary { color: #b0b0b0 !important; }
      .text-muted { color: #666666 !important; }
      .footer-link { color: #666666 !important; }
      .footer-text { color: #333333 !important; }
    }

    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; margin: auto !important; }
      .fluid { max-width: 100% !important; height: auto !important; margin-left: auto !important; margin-right: auto !important; }
      .stack-column, .stack-column-center { display: block !important; width: 100% !important; max-width: 100% !important; direction: ltr !important; }
      .mobile-padding { padding-left: 24px !important; padding-right: 24px !important; }
    }
  </style>
</head>
<body class="body-bg" style="margin: 0; padding: 0; background-color: #f5f5f5;">
  <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Thanks for reaching out! I typically respond within 24 hours. Here's how I usually kick things off...
  </div>
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="body-bg" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="560" class="email-container" style="max-width: 560px; width: 100%;">
          <tr>
            <td align="center" style="padding: 0 0 32px 0;">
              <a href="https://godwinlaureto.com" target="_blank">
                <img src="https://godwinlaureto.com/logo-godwin-2.png" alt="Godwin Laureto" width="100" style="display: block; width: 100px; height: auto;" />
              </a>
            </td>
          </tr>
          <tr>
            <td class="card-bg card-border" style="background-color: #ffffff; border-radius: 16px; border: 1px solid #e5e5e5; overflow: hidden;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="height: 4px; background: linear-gradient(90deg, #FF5C00, #FF8533); font-size: 0; line-height: 0;">&nbsp;</td>
                </tr>
              </table>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td class="mobile-padding" style="padding: 48px 48px 16px 48px;">
                    <p class="text-primary" style="margin: 0; font-family: Helvetica, Arial, sans-serif; font-size: 22px; font-weight: 700; color: #1a1a1a; line-height: 1.3;">
                      You're in good hands 🔥
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="mobile-padding" style="padding: 16px 48px 0 48px;">
                    <p class="text-secondary" style="margin: 0 0 20px 0; font-family: Helvetica, Arial, sans-serif; font-size: 15px; color: #666666; line-height: 1.7;">
                      Hey ${displayName},
                    </p>
                    <p class="text-secondary" style="margin: 0 0 20px 0; font-family: Helvetica, Arial, sans-serif; font-size: 15px; color: #666666; line-height: 1.7;">
                      Thanks for reaching out! I've received your message and I typically respond within 24 hours.
                    </p>
                    <p class="text-secondary" style="margin: 0 0 12px 0; font-family: Helvetica, Arial, sans-serif; font-size: 15px; color: #666666; line-height: 1.7;">
                      Here's how I usually kick things off:
                    </p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 20px 0;">
                      <tr>
                        <td class="text-secondary" style="padding: 0 0 8px 0; font-family: Helvetica, Arial, sans-serif; font-size: 15px; color: #666666; line-height: 1.7;">
                          • We'll hop on a quick intro call to understand your project and goals
                        </td>
                      </tr>
                      <tr>
                        <td class="text-secondary" style="padding: 0 0 8px 0; font-family: Helvetica, Arial, sans-serif; font-size: 15px; color: #666666; line-height: 1.7;">
                          • I'll put together a plan covering scope, timeline, and approach
                        </td>
                      </tr>
                      <tr>
                        <td class="text-secondary" style="padding: 0; font-family: Helvetica, Arial, sans-serif; font-size: 15px; color: #666666; line-height: 1.7;">
                          • Once aligned, we get to work
                        </td>
                      </tr>
                    </table>
                    <p class="text-secondary" style="margin: 0 0 20px 0; font-family: Helvetica, Arial, sans-serif; font-size: 15px; color: #666666; line-height: 1.7;">
                      I help startups and founders turn ideas into polished, production-ready products — from MVP design and prototyping to high-performance development. While you wait, here's some of my recent work:
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="mobile-padding" style="padding: 8px 48px 40px 48px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="border-radius: 8px; background-color: #FF5C00 !important;">
                          <a href="https://godwinlaureto.com" target="_blank" style="display: inline-block; padding: 14px 32px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; color: #ffffff !important; text-decoration: none; letter-spacing: 0.3px;">
                            View my work 👉
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td class="mobile-padding" style="padding: 0 48px;">
                    <div class="divider" style="height: 1px; background-color: #e5e5e5; font-size: 0; line-height: 0;">&nbsp;</div>
                  </td>
                </tr>
              </table>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td class="mobile-padding" style="padding: 32px 48px 40px 48px;">
                    <p class="text-secondary" style="margin: 0 0 4px 0; font-family: Helvetica, Arial, sans-serif; font-size: 15px; color: #666666; line-height: 1.7;">
                      Talk soon,
                    </p>
                    <p class="text-primary" style="margin: 0; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; color: #1a1a1a;">
                      Godwin
                    </p>
                    <p class="text-muted" style="margin: 4px 0 0 0; font-family: Helvetica, Arial, sans-serif; font-size: 13px; color: #999999;">
                      Product Designer &amp; Developer
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 32px 0 0 0;">
              <p style="margin: 0 0 12px 0; font-family: Helvetica, Arial, sans-serif; font-size: 12px; line-height: 1.6;">
                <a class="footer-link" href="https://godwinlaureto.com" style="color: #888888; text-decoration: none;">godwinlaureto.com</a>
              </p>
              <p class="footer-text" style="margin: 0; font-family: Helvetica, Arial, sans-serif; font-size: 11px; color: #aaaaaa; line-height: 1.6;">
                This is an automated reply to your message. No need to respond to this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send notification email to you
    await resend.emails.send({
      from: 'Contact Form <hello@godwinlaureto.com>',
      to: 'hello@godwinlaureto.com',
      subject: `New message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    // Send branded auto-reply to the visitor
    await resend.emails.send({
      from: 'Godwin Laureto <hello@godwinlaureto.com>',
      to: email,
      subject: `Hey ${name || 'there'}, got your message!`,
      html: getAutoReplyHtml(name),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}