import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import Footer from './FooterDisplay';

export default () => {
  const { footer: { frontmatter: { content: footerContent } }, contactInfo: { frontmatter: { content: contactContent } } } = useStaticQuery(graphql`
    query FooterQuery {
      footer: markdownRemark(frontmatter: {
        contentType: { eq: "footer_settings" }
      }){
        frontmatter {
          content {
            language
            copyrightText
            links {
              text
              url
            }
          }
        }
      }
      contactInfo: markdownRemark(
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
          }
        }
      }
    }
  `);
  const language = useContext(LanguageContext);
  const footerDefaultContent = footerContent[0];
  const { copyrightText, links } = footerContent.find(c => c.language === language) || footerDefaultContent;
  const contactDefaultContent = contactContent[0];
  const contactDetails = contactContent.find(c => c.language === language) || contactDefaultContent;
  console.log(footerContent);

  return (
    <Footer
      copyrightText={copyrightText}
      contactDetails={contactDetails}
      links={links}
    />
  );
};
