import React, { useState } from 'react';
import classnames from 'classnames';
import './index.less';
import SocialIcons from '../social-icons';

const ContactForm = ({
  onSubmit,
  title,
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
  thankYouMessage
}) => {
  const [inProgress, setInProgress] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setInProgress(true);
    const promise = onSubmit
      ? onSubmit(event)
      : Promise.resolve();
    promise.then(() => {
      setInProgress(false);
      setIsSent(true);
    });
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
          listClassName='social-icons-container'
          listItemClassName='social-icons-item'
            icons={[
              {type: 'Facebook', url: 'https://www.facebook.com/psychologist.olesya.bobruyko'},
              {type: 'Instagram', url: 'https://www.instagram.com/olesya.bobruyko/'},
              {type: 'Mail', url: 'mailto:psychologist.olesya.b@gmail.com'},
            ]}
          />
      </div>
      {
        isSent
          ? (
            <p className="contact-form__sent-message">
              {thankYouMessage}
            </p>
          )
          : (
            <form onSubmit={e => handleSubmit(e)} className="contact-form__form">
              <input className="contact-form__input contact-form__input--name" type="text" name="name" placeholder={nameInputPlaceholder} required />
              <input className="contact-form__input contact-form__input--email" type="email" name="email" placeholder={emailInputPlaceholder} required />
              <input className="contact-form__input contact-form__input--subject" type="text" name="subject" placeholder={subjectInputPlaceholder} />
              <textarea className="contact-form__input contact-form__input--text" name="text" placeholder={textInputPlaceholder} required />
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
}

export default ContactForm;
