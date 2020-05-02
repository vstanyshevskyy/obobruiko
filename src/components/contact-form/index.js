import React, { useContext } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Config from '../../config';
import LanguageContext from '../../context/LanguageContext';
import ContactForm from './contactFormDisplay';
import SheetsSubmitter from '../sheets-submitter';

export default () => (
  <StaticQuery
    query={graphql`
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
    `}
    render={({ contactForm: { frontmatter: { content } } }) => {
      const language = useContext(LanguageContext);
      return (
        <SheetsSubmitter apiUrl={Config.contactApiUrl}>
          <ContactForm {...content.find(c => c.language === language)} />
        </SheetsSubmitter>
      );
    }}
  />
);
