import React, { useState, useRef   } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import classnames from 'classnames';
import './index.less';
import SocialIcons from '../social-icons';
import {ErrorBanner, SuccessBanner} from '../banner';

const ContactForm = ({
  title,
  contactFormTitle,
  address,
  email,
  emailText,
  phone,
  phoneText,
  nameInputPlaceholder,
  emailInputPlaceholder,
  subjectInputPlaceholder,
  textInputPlaceholder,
  submitButtonText,
  thankYouMessage,
  language
}) => {
  const [inProgress, setInProgress] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const recaptchaRef = useRef(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleError = (errorData) => {
    const errorMessagesEn = {
      MISSING_FIELDS: 'Please fill in all required fields.',
      INVALID_RECAPTCHA: 'CAPTCHA verification failed. Please try again.',
      EMAIL_SEND_FAILED: 'Failed to send the email. Please try again later.',
      DEFAULT: 'An error occurred. Please try again.',
      MISSING_FORM_TYPE: 'An error occurred. Please try again.',
      UNSUPPORTED_FORM_TYPE: 'An error occurred. Please try again.',
    };

    const errorMessagesUa = {
      MISSING_FIELDS: 'Будь ласка, заповніть всі обов\'язкові поля.',
      INVALID_RECAPTCHA: 'Перевірка CAPTCHA не вдалася. Будь ласка, спробуйте ще раз.',
      EMAIL_SEND_FAILED: 'Не вдалося надіслати електронний лист. Будь ласка, спробуйте пізніше.',
      DEFAULT: 'Сталася помилка. Будь ласка, спробуйте ще раз.',
      MISSING_FORM_TYPE: 'Сталася помилка. Будь ласка, спробуйте ще раз.',
      UNSUPPORTED_FORM_TYPE: 'Сталася помилка. Будь ласка, спробуйте ще раз.',
    }

    const errorMessages = language.toLowerCase() === 'ua' ? errorMessagesUa : errorMessagesEn;
  
    const message = errorMessages[errorData.code] || errorMessages.DEFAULT;
    setErrorMessage(message);
  };

  const handleCaptchaChange = (token) => {
    setIsCaptchaVerified(!!token);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setInProgress(true);

    if (!isCaptchaVerified) {
      handleError({ code: 'INVALID_RECAPTCHA' });
      setInProgress(false);
      return;
    }

    const data = new FormData(event.target);
    const formObj = {};
    data.forEach((value, key) => formObj[key] = value);

    const recaptchaToken = recaptchaRef.current.getValue();
    formObj.recaptchaToken = recaptchaToken;
    formObj.formType = 'contact';

    try {
      const response = await fetch('/.netlify/functions/form-handler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObj),
      });
  
      if (response.ok) {
        setIsSent(true);
        setErrorMessage('');
      } else {
        const errorData = await response.json();
        throw(errorData);
      }
    } catch (error) {
      handleError(error)
    } finally {
      setInProgress(false);
      recaptchaRef.current.reset();
      setIsCaptchaVerified(false);
    }
  };

  return (
    <div className="contact-form" id="contact">
      <h3 className="contact-form__title">{title}</h3>
      <p className="contact-form__contact contact-form__contact--address">{address}</p>
      <p className="contact-form__contact contact-form__contact--email">
        <a href={`mailto:${email}`}>{emailText}</a>
      </p>
      <p className="contact-form__contact contact-form__contact--phone">
        <a href={`tel:${phone}`}>{phoneText}</a>
      </p>
      <div>
        <SocialIcons
          listClassName="social-icons-container"
          listItemClassName="social-icons-item"
          icons={[
            { type: 'Facebook', url: 'https://www.facebook.com/psychologist.olesya.bobruyko' },
            { type: 'Instagram', url: 'https://www.instagram.com/olesya.bobruyko/' },
            { type: 'Skype', url: 'https://join.skype.com/invite/mwn1okh3jRcF' },
            { type: 'Mail', url: 'mailto:psychologist.olesya.b@gmail.com' },
            { type: 'Youtube', url: 'https://www.youtube.com/channel/UCax4hKxA_XE-rkvVFI4UJQQ' }
          ]}
        />
      </div>
      {
        isSent
          ? (
            <SuccessBanner message={thankYouMessage} />
          )
          : (
            <form onSubmit={handleSubmit} className="contact-form__form">
              <h3 className="contact-form__form-title">{contactFormTitle}</h3>
              <input className="contact-form__input contact-form__input--name" type="text" name="name" placeholder={nameInputPlaceholder} required />
              <input className="contact-form__input contact-form__input--email" type="email" name="email" placeholder={emailInputPlaceholder} required />
              <input className="contact-form__input contact-form__input--subject" type="text" name="subject" placeholder={subjectInputPlaceholder} />
              <textarea className="contact-form__input contact-form__input--text" name="text" placeholder={textInputPlaceholder} required />
              <div className='contact-form__recaptcha-container'>
                {
                  process.env.GATSBY_RECAPTCHA_SITE_KEY &&
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.GATSBY_RECAPTCHA_SITE_KEY || ''}
                    onChange={handleCaptchaChange}
                    theme='dark'
                    hl={language.toLowerCase() === 'ua' ? 'uk' : language.toLowerCase()}
                  />
                }
              </div>
              <ErrorBanner message={errorMessage} />
              <button
                disabled={inProgress}
                type="submit"
                className={classnames('btn btn--light contact-form__btn', {
                  'btn contact-form__btn--in-progress': inProgress
                })}
              >
                {submitButtonText}
              </button>
            </form>
          )
      }
    </div>
  );
};

export default ContactForm;
