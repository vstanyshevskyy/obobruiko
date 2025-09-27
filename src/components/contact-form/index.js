import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import ContactForm from './contactFormDisplay';

export default () => {
  const { contactForm: { frontmatter: { content } } } = useStaticQuery(graphql`
    query ContactFormQuery {
      contactForm: markdownRemark(
        frontmatter: {
          contentType: { eq: "contact_form_settings" }
        }
      ) {
        frontmatter {
          content {
            language
            title
            address
            email
            emailText
            phone
            phoneText
            contactFormTitle
            nameInputPlaceholder
            emailInputPlaceholder
            subjectInputPlaceholder
            textInputPlaceholder
            submitButtonText
            thankYouMessage
          }
        }
      }
    }
  `);
  const language = useContext(LanguageContext);
  return (
    <ContactForm {...content.find(c => c.language === language)} />
  );
};
