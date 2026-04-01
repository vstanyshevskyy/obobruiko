import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import { useConsent } from '../../context/ConsentContext';
import Footer from './FooterDisplay';

const consentLabelByLanguage = {
  EN: 'Consent Preferences',
  RU: 'Настройки cookies',
  UK: 'Налаштування cookies'
};

export default function FooterContainer() {
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
  const { openBanner } = useConsent();
  const footerDefaultContent = footerContent[0];
  const { copyrightText, links } = footerContent.find(c => c.language === language)
    || footerDefaultContent;
  const contactDefaultContent = contactContent[0];
  const contactDetails = contactContent.find(c => c.language === language) || contactDefaultContent;

  return (
    <Footer
      copyrightText={copyrightText}
      contactDetails={contactDetails}
      links={links}
      consentPreferencesLabel={consentLabelByLanguage[language] || consentLabelByLanguage.EN}
      onOpenConsentPreferences={openBanner}
    />
  );
}
