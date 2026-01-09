import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import classnames from 'classnames';
import { ErrorBanner, SuccessBanner } from '../../../../components/banner';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import './QuestionnaireResultsForm.less';

const RECAPTCHA_SITE_KEY = '6Lf9a8ArAAAAAAULSuq-Lyi4iD0tupsVq4Pdh2vp';

const QuestionnaireResultsForm = () => {
  const {
    getCurrentState, referrer, language = 'en', questionnaireName
  } = useQuestionnaire();

  // Only show form in local development
  const isLocalDevelopment = typeof window !== 'undefined'
    && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (!isLocalDevelopment) {
    return null;
  }

  // Translations
  const translations = {
    en: {
      formTitle: 'Save Your Results',
      successMessage: 'Your results have been saved successfully!',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'Your email',
      checkboxLabel: 'I agree to the processing of my personal data',
      submitButton: 'Submit Results',
      submittingButton: 'Submitting...',
      errorMessages: {
        MISSING_FIELDS: 'Please fill in all required fields.',
        INVALID_RECAPTCHA: 'CAPTCHA verification failed. Please try again.',
        CHECKBOX_NOT_CHECKED: 'You must agree to the processing of personal data.',
        RECAPTCHA_EXPIRED: 'CAPTCHA has expired. Please verify again.',
        DEFAULT: 'An error occurred. Please try again.'
      }
    },
    uk: {
      formTitle: 'Відправити результати',
      successMessage: 'Твої результати успішно відправлено!',
      namePlaceholder: 'Твоє ім\'я',
      emailPlaceholder: 'Твій email',
      checkboxLabel: 'Я погоджуюся на обробку моїх персональних даних',
      submitButton: 'Надіслати результати',
      submittingButton: 'Надсилання...',
      errorMessages: {
        MISSING_FIELDS: 'Будь ласка, заповни всі обов\'язкові поля.',
        INVALID_RECAPTCHA: 'Перевірка CAPTCHA не вдалася. Будь ласка, спробуй ще раз.',
        CHECKBOX_NOT_CHECKED: 'Відсутня згода на обробку персональних даних.',
        RECAPTCHA_EXPIRED: 'Термін дії CAPTCHA минув. Будь ласка, підтверди знову.',
        DEFAULT: 'Сталася помилка. Будь ласка, спробуй ще раз.'
      }
    },
    ru: {
      formTitle: 'Сохранить ваши результаты',
      successMessage: 'Ваши результаты успешно сохранены!',
      namePlaceholder: 'Ваше имя',
      emailPlaceholder: 'Ваш email',
      checkboxLabel: 'Я согласен на обработку моих персональных данных',
      submitButton: 'Отправить результаты',
      submittingButton: 'Отправка...',
      errorMessages: {
        MISSING_FIELDS: 'Пожалуйста, заполните все обязательные поля.',
        INVALID_RECAPTCHA: 'Проверка CAPTCHA не удалась. Пожалуйста, попробуйте еще раз.',
        CHECKBOX_NOT_CHECKED: 'Вы должны согласиться с обработкой персональных данных.',
        RECAPTCHA_EXPIRED: 'Срок действия CAPTCHA истек. Пожалуйста, подтвердите снова.',
        DEFAULT: 'Произошла ошибка. Пожалуйста, попробуйте еще раз.'
      }
    }
  };

  const t = translations[language.toLowerCase()] || translations.en;

  const [inProgress, setInProgress] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

  const recaptchaRef = useRef(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleError = errorCode => {
    const message = t.errorMessages[errorCode] || t.errorMessages.DEFAULT;
    setErrorMessage(message);
  };

  const handleCaptchaChange = token => {
    setIsCaptchaVerified(!!token);
    if (token) {
      setErrorMessage('');
    }
  };

  const handleCaptchaExpired = () => {
    setIsCaptchaVerified(false);
    handleError('RECAPTCHA_EXPIRED');
  };

  const handleCheckboxChange = e => {
    setIsAgreed(e.target.checked);
    if (e.target.checked) {
      setErrorMessage('');
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setErrorMessage('');

    // Validate checkbox
    if (!isAgreed) {
      handleError('CHECKBOX_NOT_CHECKED');
      return;
    }

    // Validate reCAPTCHA
    if (!isCaptchaVerified) {
      handleError('INVALID_RECAPTCHA');
      return;
    }

    setInProgress(true);

    try {
      // Get current questionnaire state
      const questionnaireState = getCurrentState();

      // Get form data
      const formData = new FormData(event.target);
      const name = formData.get('name');
      const email = formData.get('email');

      // Get reCAPTCHA token
      const recaptchaToken = recaptchaRef.current.getValue();

      // Prepare submission data
      const submissionData = {
        name,
        email,
        language,
        referrer,
        questionnaireName,
        questionnaireState,
        recaptchaToken
      };

      // Log the complete state
      // eslint-disable-next-line no-console
      console.log('Questionnaire Submission:', {
        ...submissionData,
        timestamp: new Date().toISOString()
      });

      // Determine the function URL based on environment
      // When using `netlify functions:serve`, functions run on port 9999
      // When using `netlify dev`, functions are available at /.netlify/functions/
      const functionUrl = window.location.hostname === 'localhost' && window.location.port === '8000'
        ? 'http://localhost:9999/.netlify/functions/questionnaire-handler'
        : '/.netlify/functions/questionnaire-handler';

      // Submit to Netlify function
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        setIsSent(true);
        setErrorMessage('');
      } else {
        const errorData = await response.json();
        throw errorData;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error during submission:', error);
      handleError(error.code || 'DEFAULT');
    } finally {
      setInProgress(false);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setIsCaptchaVerified(false);
      setIsAgreed(false);
    }
  };

  return (
    <div className="score__form-section">
      <h3 className="score__form-title">{t.formTitle}</h3>
      {isSent ? (
        <SuccessBanner message={t.successMessage} />
      ) : (
        <form onSubmit={handleSubmit} className="score__form">
          <input
            className="score__input score__input--name"
            type="text"
            name="name"
            placeholder={t.namePlaceholder}
            required
            disabled={inProgress}
          />
          <input
            className="score__input score__input--email"
            type="email"
            name="email"
            placeholder={t.emailPlaceholder}
            required
            disabled={inProgress}
          />

          <div className="score__checkbox-container">
            <label htmlFor="personal-data-checkbox" className="score__checkbox-label">
              <input
                id="personal-data-checkbox"
                type="checkbox"
                checked={isAgreed}
                onChange={handleCheckboxChange}
                disabled={inProgress}
              />
              <span>
                {t.checkboxLabel}
              </span>
            </label>
          </div>

          <div className="score__recaptcha-container">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={handleCaptchaChange}
              onExpired={handleCaptchaExpired}
              theme="light"
              hl={language.toLowerCase() === 'uk' ? 'uk' : language.toLowerCase()}
            />
          </div>

          <ErrorBanner message={errorMessage} />

          <button
            disabled={inProgress || !isAgreed || !isCaptchaVerified}
            type="submit"
            className={classnames('btn score__btn score__btn--submit', {
              'score__btn--in-progress': inProgress
            })}
          >
            {inProgress ? t.submittingButton : t.submitButton}
          </button>
        </form>
      )}
    </div>
  );
};

export default QuestionnaireResultsForm;
