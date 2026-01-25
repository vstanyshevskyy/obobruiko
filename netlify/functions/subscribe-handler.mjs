import { Resend } from 'resend';

export default async req => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Validate environment variables
  const resendApiKey = process.env.RESEND_API_KEY;
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!resendApiKey) {
    return new Response('Missing Resend API key', { status: 500 });
  }

  if (!recaptchaSecretKey) {
    return new Response('Missing reCAPTCHA secret key', { status: 500 });
  }

  if (!audienceId) {
    return new Response('Missing Resend Audience ID', { status: 500 });
  }

  // Parse request body
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return new Response('Invalid JSON body', { status: 400 });
  }

  const { formType, email, recaptchaToken } = body;

  // Validate formType
  if (!formType) {
    return new Response(
      JSON.stringify({ message: 'Missing formType parameter', code: 'MISSING_FORM_TYPE' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Validate required fields for subscribe form
  if (formType === 'subscribe') {
    const missingFields = [];
    if (!email) missingFields.push('email');
    if (!recaptchaToken) missingFields.push('recaptchaToken');

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({
          message: 'Missing required fields for subscribe form',
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
        response: recaptchaToken
      })
    });

    const recaptchaResult = await recaptchaResponse.json();
    if (!recaptchaResult.success) {
      return new Response(
        JSON.stringify({ message: 'Invalid reCAPTCHA token', code: 'INVALID_RECAPTCHA' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(resendApiKey);

    try {
      // Add contact to audience
      const { data, error } = await resend.contacts.create({
        email,
        audienceId
      });

      if (error) {
        // Check if contact already exists
        if (error.message && error.message.includes('already exists')) {
          return new Response(
            JSON.stringify({ message: 'Email already subscribed', code: 'ALREADY_SUBSCRIBED' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ message: 'Failed to add subscriber', code: 'SUBSCRIPTION_FAILED' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ message: 'Subscribed successfully', contactId: data.id }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ message: 'Unexpected error occurred', code: 'UNEXPECTED_ERROR' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  return new Response(
    JSON.stringify({ message: 'Unsupported formType parameter', code: 'UNSUPPORTED_FORM_TYPE' }),
    { status: 400, headers: { 'Content-Type': 'application/json' } }
  );
};
