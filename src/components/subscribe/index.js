import React, { useContext } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import Form from './FormDisplay';
import SheetsSubmitter from '../sheets-submitter';
import config from '../../config';

export default () => (
  <StaticQuery
    query={graphql`
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
    `}
    render={({ subscribeSettings: { frontmatter: { content } } }) => {
      const language = useContext(LanguageContext);
      const subscribeFormParams = content.find(c => c.language === language) || content[0];
      return (
        <SheetsSubmitter apiUrl={config.subscribeApiUrl}>
          <Form {...subscribeFormParams} />
        </SheetsSubmitter>
      );
    }}
  />
);
