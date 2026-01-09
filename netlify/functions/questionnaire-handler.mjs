import { Resend } from 'resend';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export default async (req, context) => {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // Validate environment variables
  const resendApiKey = process.env.RESEND_API_KEY;
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
  const adminEmail = process.env.CONTACT_FORM_RECIPIENT_EMAIL;

  if (!resendApiKey) {
    console.error('Missing Resend API key');
    return new Response(
      JSON.stringify({ message: 'Missing Resend API key', code: 'MISSING_API_KEY' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  if (!recaptchaSecretKey) {
    console.error('Missing reCAPTCHA secret key');
    return new Response(
      JSON.stringify({ message: 'Missing reCAPTCHA secret key', code: 'MISSING_RECAPTCHA_KEY' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  if (!adminEmail) {
    console.error('Missing admin email');
    return new Response(
      JSON.stringify({ message: 'Missing admin email', code: 'MISSING_RECIPIENT_EMAIL' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Parse request body
  let body;
  try {
    body = await req.json();
  } catch (error) {
    console.error('Invalid JSON body', error);
    return new Response(
      JSON.stringify({ message: 'Invalid JSON body', code: 'INVALID_JSON' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const {
    name, email, language, referrer, questionnaireName, questionnaireState, recaptchaToken
  } = body;

  // Email translations
  const translations = {
    en: {
      // Admin email
      adminEmailSubject: 'Questionnaire Results from',
      adminHeading: 'New Questionnaire Submission',
      // User email
      userEmailSubject: 'Your Questionnaire Results',
      userHeading: 'Thank you for completing the questionnaire',
      userIntro: 'Here are your results:',
      // Common
      property: 'Property',
      value: 'Value',
      name: 'Name',
      email: 'Email',
      language: 'Language',
      referrer: 'Referrer',
      totalScore: 'Total Score',
      resultSummary: 'Result Summary',
      questionsAndAnswers: 'Questions & Answers',
      question: 'Question',
      answer: 'Answer',
      resultDetails: 'Result Details',
      noResults: 'No detailed results available'
    },
    uk: {
      // Admin email
      adminEmailSubject: 'Результати опитувальника від',
      adminHeading: 'Нова відповідь на опитувальник',
      // User email
      userEmailSubject: 'Ваші результати опитувальника',
      userHeading: 'Дякуємо за заповнення опитувальника',
      userIntro: 'Ось ваші результати:',
      // Common
      property: 'Властивість',
      value: 'Значення',
      name: 'Ім\'я',
      email: 'Email',
      language: 'Мова',
      referrer: 'Джерело',
      totalScore: 'Загальний бал',
      resultSummary: 'Підсумок результатів',
      questionsAndAnswers: 'Запитання та відповіді',
      question: 'Запитання',
      answer: 'Відповідь',
      resultDetails: 'Детальні результати',
      noResults: 'Детальні результати недоступні'
    },
    ru: {
      // Admin email
      adminEmailSubject: 'Результаты опросника от',
      adminHeading: 'Новый ответ на опросник',
      // User email
      userEmailSubject: 'Ваши результаты опросника',
      userHeading: 'Спасибо за заполнение опросника',
      userIntro: 'Вот ваши результаты:',
      // Common
      property: 'Свойство',
      value: 'Значение',
      name: 'Имя',
      email: 'Email',
      language: 'Язык',
      referrer: 'Источник',
      totalScore: 'Общий балл',
      resultSummary: 'Итоги результатов',
      questionsAndAnswers: 'Вопросы и ответы',
      question: 'Вопрос',
      answer: 'Ответ',
      resultDetails: 'Детальные результаты',
      noResults: 'Детальные результаты недоступны'
    }
  };

  const t = translations[language?.toLowerCase()] || translations.en;

  // Validate required fields
  const missingFields = [];
  if (!name) missingFields.push('name');
  if (!email) missingFields.push('email');
  if (!questionnaireName) missingFields.push('questionnaireName');
  if (!questionnaireState) missingFields.push('questionnaireState');
  if (!recaptchaToken) missingFields.push('recaptchaToken');

  if (missingFields.length > 0) {
    console.error('Missing required fields:', missingFields);
    return new Response(
      JSON.stringify({
        message: 'Missing required fields',
        code: 'MISSING_FIELDS',
        missingFields
      }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
    console.error('Invalid reCAPTCHA token', recaptchaResult);
    return new Response(
      JSON.stringify({ message: 'Invalid reCAPTCHA token', code: 'INVALID_RECAPTCHA' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Initialize Resend
  const resend = new Resend(resendApiKey);

  // Convert markdown to HTML using remark
  const markdownToHtml = async markdown => {
    if (!markdown) return '';

    // Strip out custom icon shortcodes (e.g., :icon-PiListChecksThin:)
    const cleanedMarkdown = markdown.replace(/:icon-[\w-]+:/g, '');

    const result = await remark()
      .use(remarkHtml)
      .process(cleanedMarkdown);

    return String(result);
  };

  // Generate questions HTML
  const questionsHtml = questionnaireState.questionsWithAnswers
    .map(
      qa => `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${qa.questionText}</td>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>${qa.selectedAnswer.answerText} (${qa.selectedAnswer.answerValue})</strong></td>
        </tr>
      `
    )
    .join('');

  // Convert markdown result text to HTML
  const resultTextHtml = await markdownToHtml(questionnaireState.resultText);

  // Send email to admin with full details
  const adminEmailHtml = `
    <h1>${questionnaireName}: ${t.adminHeading}</h1>
    <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; margin-bottom: 20px;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4;">${t.property}</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4;">${t.value}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${t.name}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${name}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${t.email}</td>
          <td style="border: 1px solid #ddd; padding: 8px;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${t.language}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${language || 'N/A'}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${t.referrer}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${referrer || 'N/A'}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${t.totalScore}</td>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>${questionnaireState.totalScore}</strong></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${t.resultSummary}</td>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>${questionnaireState.resultSummary}</strong></td>
        </tr>
      </tbody>
    </table>

    <h2>${t.questionsAndAnswers}</h2>
    <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; margin-bottom: 20px;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4; width: 60%;">${t.question}</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4; width: 40%;">${t.answer}</th>
        </tr>
      </thead>
      <tbody>
        ${questionsHtml}
      </tbody>
    </table>

    <h2>${t.resultDetails}</h2>
    <div style="padding: 15px; background-color: #f9f9f9; border-left: 4px solid #4CAF50; font-family: Arial, sans-serif;">
      ${resultTextHtml || t.noResults}
    </div>
  `;

  // Send email to user with their results (without admin info like referrer)
  const userEmailHtml = `
    <h1>${questionnaireName}</h1>
    <p style="font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; margin-top: 10px;">${t.userHeading}</p>
    <p style="font-family: Arial, sans-serif; font-size: 16px;">${t.userIntro}</p>
    
    <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; margin: 20px 0;">
      <tbody>
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px; background-color: #f4f4f4; font-weight: bold;">${t.totalScore}</td>
          <td style="border: 1px solid #ddd; padding: 12px;"><strong style="font-size: 18px;">${questionnaireState.totalScore}</strong></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px; background-color: #f4f4f4; font-weight: bold;">${t.resultSummary}</td>
          <td style="border: 1px solid #ddd; padding: 12px;"><strong>${questionnaireState.resultSummary}</strong></td>
        </tr>
      </tbody>
    </table>

    <h2>${t.questionsAndAnswers}</h2>
    <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; margin-bottom: 20px;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4; width: 60%;">${t.question}</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4; width: 40%;">${t.answer}</th>
        </tr>
      </thead>
      <tbody>
        ${questionsHtml}
      </tbody>
    </table>

    <h2>${t.resultDetails}</h2>
    <div style="padding: 15px; background-color: #f9f9f9; border-left: 4px solid #4CAF50; font-family: Arial, sans-serif;">
      ${resultTextHtml || t.noResults}
    </div>
  `;

  // Send email to admin
  const { data: adminData, error: adminError } = await resend.emails.send({
    from: 'Olesia Bobruiko <contact@send.bobruiko.com>',
    to: [adminEmail],
    subject: `${t.adminEmailSubject} ${name}`,
    html: adminEmailHtml
  });

  if (adminError) {
    console.error('Failed to send admin email:', adminError);
    return new Response(
      JSON.stringify({ message: 'Failed to send email to admin', code: 'EMAIL_SEND_FAILED' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Send email to user
  const { data: userData, error: userError } = await resend.emails.send({
    from: 'Olesia Bobruiko <contact@send.bobruiko.com>',
    to: [email],
    subject: t.userEmailSubject,
    html: userEmailHtml
  });

  if (userError) {
    console.error('Failed to send user email:', userError);
    // Still return success if admin email was sent
    console.log('Admin email sent successfully, but user email failed');
  }

  console.log('Questionnaire emails sent successfully', { adminData, userData });

  return new Response(
    JSON.stringify({ message: 'Questionnaire submitted successfully', code: 'SUCCESS' }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
};
