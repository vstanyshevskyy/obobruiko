import React from 'react';
import './index.less';

const ContactForm = (props) => {
  return (
    <div className='contact-form'>
      <h3 className='contact-form__title'>Contact Me</h3>
      <p className='contact-form__contact contact-form__contact--address'>Romanchuka Street, 14, L'viv, L'vivs'ka oblast, Ukraine, 79005</p>
      <p className='contact-form__contact contact-form__contact--email'>
        <a href='mailto:lesichka939@gmail.com'>lesichka939@gmail.com</a>
      </p>
      <p className='contact-form__contact contact-form__contact--phone'>
        <a href='tel:099 440 3712'>099 440 3712</a>
      </p>
      <form onSubmit={() => {}}>
        
      </form>
    </div>
  );
}

export default ContactForm;
