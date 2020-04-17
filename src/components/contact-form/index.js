import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Config from '../../config';
import ContactForm from './contactFormDisplay';
import SheetsSubmitter from '../sheets-submitter';

export default () => (
  <StaticQuery
    query={graphql`
      query ContactFormQuery {
        contactForm: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "contact_form_settings"} }}){
          edges{
            node{
              frontmatter{
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
      }
    `}
    render={({ contactForm: { edges: [{ node: { frontmatter: props } }] } }) => (
      <SheetsSubmitter apiUrl={Config.contactApiUrl}>
        <ContactForm {... props} />
      </SheetsSubmitter>
    )}
  />
);
