import { Resend } from 'resend';


export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Validate environment variables
  const resendApiKey = process.env.RESEND_API_KEY;
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
  const contactFormRecipientEmail = process.env.CONTACT_FORM_RECIPIENT_EMAIL;

  if (!resendApiKey) {
    console.error('Missing Resend API key');
    return new Response('Missing Resend API key', { status: 500 });
  }

  if (!recaptchaSecretKey) {
    console.error('Missing reCAPTCHA secret key');
    return new Response('Missing reCAPTCHA secret key', { status: 500 });
  }

  if (!contactFormRecipientEmail) {
    console.error('Missing contact form recipient email');
    return new Response('Missing contact form recipient email', { status: 500 });
  }

  // Parse request body
  let body;
  try {
    body = await req.json();
  } catch (error) {
    console.error('Invalid JSON body', error);
    return new Response('Invalid JSON body', { status: 400 });
  }

  const { formType, name, email, subject, text, recaptchaToken } = body;

  // Validate formType
  if (!formType) {
    console.error('Missing formType parameter');
    return new Response(
      JSON.stringify({ message: 'Missing formType parameter', code: 'MISSING_FORM_TYPE' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Validate required fields for contact form
  if (formType === 'contact') {
    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!subject) missingFields.push('subject');
    if (!text) missingFields.push('text');
    if (!recaptchaToken) missingFields.push('recaptchaToken');

    if (missingFields.length > 0) {
      console.error('Missing required fields for contact form:', missingFields);
      return new Response(
        JSON.stringify({ 
          message: 'Missing required fields for contact form', 
          code: 'MISSING_FIELDS', 
          missingFields 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate reCAPTCHA token
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: recaptchaSecretKey,
        response: recaptchaToken,
      }),
    });

    const recaptchaResult = await recaptchaResponse.json();
    if (!recaptchaResult.success) {
      console.error('Invalid reCAPTCHA token', recaptchaResult);
      return new Response(
        JSON.stringify({ message: 'Invalid reCAPTCHA token', code: 'INVALID_RECAPTCHA' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from: 'Olesia Bobruiko <contact@send.bobruiko.com>',
      to: [contactFormRecipientEmail],
      subject: `Contact from Bobruiko.com: ${subject}`,
      html: `
      <h1>New contact form submission</h1>
      <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
        <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4;">Property</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4;">Value</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Name</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${name}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Email</td>
          <td style="border: 1px solid #ddd; padding: 8px;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Subject</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${subject}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Message</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${text}</td>
        </tr>
        </tbody>
      </table>
      `,
    });
    
    if (error) {
      console.error({ error });
      return new Response(
        JSON.stringify({ message: 'Failed to send email', code: 'EMAIL_SEND_FAILED' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('Email sent successfully', data);
    return new Response('Email sent successfully', { status: 200 });
  }

  return new Response(
    JSON.stringify({ message: 'Unsupported formType parameter', code: 'UNSUPPORTED_FORM_TYPE' }),
    { status: 400, headers: { 'Content-Type': 'application/json' } }
  );
};
