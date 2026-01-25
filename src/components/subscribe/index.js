import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import Form from './FormDisplay';

export default () => {
  const {
    subscribeSettings: {
      frontmatter: { content }
    }
  } = useStaticQuery(graphql`
    query SubscribeQuery {
      subscribeSettings: markdownRemark(frontmatter: {
        contentType: { eq: "subscribe_form_settings" }
      }){
        frontmatter {
          content {
            language
            title
            emailPlaceholder
            emailLabel
            buttonText
            thanksTitle
            thanksText
          }
        }
      }
    }
  `);
  const language = useContext(LanguageContext);
  const defaultContent = content[0];
  const subscribeFormParams = content.find(c => c.language === language) || defaultContent;
  return (
    <Form {...subscribeFormParams} language={language} />
  );
};
