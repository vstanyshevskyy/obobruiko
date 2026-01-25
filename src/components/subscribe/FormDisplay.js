import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FaHeart } from 'react-icons/fa';
import ReCAPTCHA from 'react-google-recaptcha';
import { ErrorBanner } from '../banner';
import config from '../../config';
import './index.less';

const SubscribeForm = ({
  thanksTitle,
  thanksText,
  title,
  emailLabel,
  emailPlaceholder,
  buttonText,
  language = 'UK'
}) => {
  const [inProgress, setInProgress] = useState(false);
  const [thanks, setThanks] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const recaptchaRef = useRef(null);

  const handleError = errorData => {
    const errorMessagesEn = {
      MISSING_FIELDS: 'Please fill in all required fields.',
      INVALID_RECAPTCHA: 'CAPTCHA verification failed. Please try again.',
      SUBSCRIPTION_FAILED: 'Failed to subscribe. Please try again later.',
      ALREADY_SUBSCRIBED: 'This email is already subscribed.',
      UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again.',
      DEFAULT: 'An error occurred. Please try again.',
      MISSING_FORM_TYPE: 'An error occurred. Please try again.',
      UNSUPPORTED_FORM_TYPE: 'An error occurred. Please try again.'
    };

    const errorMessagesUa = {
      MISSING_FIELDS: 'Будь ласка, заповніть всі обов\'язкові поля.',
      INVALID_RECAPTCHA: 'Перевірка CAPTCHA не вдалася. Будь ласка, спробуйте ще раз.',
      SUBSCRIPTION_FAILED: 'Не вдалося підписатися. Будь ласка, спробуйте пізніше.',
      ALREADY_SUBSCRIBED: 'Ця електронна адреса вже підписана.',
      UNEXPECTED_ERROR: 'Сталася неочікувана помилка. Будь ласка, спробуйте ще раз.',
      DEFAULT: 'Сталася помилка. Будь ласка, спробуйте ще раз.',
      MISSING_FORM_TYPE: 'Сталася помилка. Будь ласка, спробуйте ще раз.',
      UNSUPPORTED_FORM_TYPE: 'Сталася помилка. Будь ласка, спробуйте ще раз.'
    };

    const errorMessages = language.toLowerCase() === 'uk' ? errorMessagesUa : errorMessagesEn;
    const message = errorMessages[errorData.code] || errorMessages.DEFAULT;
    setErrorMessage(message);
  };

  const handleCaptchaChange = token => {
    setIsCaptchaVerified(!!token);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setInProgress(true);
    setErrorMessage('');

    if (!isCaptchaVerified) {
      handleError({ code: 'INVALID_RECAPTCHA' });
      setInProgress(false);
      return;
    }

    const data = new FormData(event.target);
    const formObj = {};
    data.forEach((value, key) => {
      formObj[key] = value;
    });

    const recaptchaToken = recaptchaRef.current.getValue();
    formObj.recaptchaToken = recaptchaToken;
    formObj.formType = 'subscribe';

    try {
      const response = await fetch('/.netlify/functions/subscribe-handler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObj)
      });

      if (response.ok) {
        setThanks(true);
        setErrorMessage('');
      } else {
        const errorData = await response.json();
        throw errorData;
      }
    } catch (error) {
      handleError(error);
    } finally {
      setInProgress(false);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setIsCaptchaVerified(false);
      }
    }
  };

  const subscribeClasses = classNames('subscribe', {
    'subscribe--thanks': thanks,
    'subscribe--in-progress': inProgress
  });

  if (thanks) {
    return (
      <div className={subscribeClasses}>
        <FaHeart className="subscribe__heart" />
        <p className="h3">{thanksTitle}</p>
        <p>{thanksText}</p>
      </div>
    );
  }

  return (
    <div className={subscribeClasses}>
      <form
        className="subscribe__form"
        onSubmit={handleSubmit}
      >
        <h3 className="subscribe_header">{title}</h3>
        <input
          aria-label={emailLabel}
          id="subscribe__form-email"
          className={classNames('input', 'input--accent', 'subscribe__form-email')}
          type="email"
          required
          name="email"
          placeholder={emailPlaceholder}
        />
        <div className="subscribe__recaptcha-container">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={config.recaptchaSiteKey}
            onChange={handleCaptchaChange}
            theme="light"
            hl={language.toLowerCase()}
          />
        </div>
        <button
          type="submit"
          className="btn subscribe__form-btn"
          disabled={inProgress}
        >
          {buttonText}
        </button>
        <ErrorBanner message={errorMessage} />
      </form>
    </div>
  );
};

SubscribeForm.propTypes = {
  thanksTitle: PropTypes.string.isRequired,
  thanksText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  emailLabel: PropTypes.string.isRequired,
  emailPlaceholder: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  language: PropTypes.string
};

SubscribeForm.defaultProps = {
  language: 'UK'
};

export default SubscribeForm;
