import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import FAQ from './faqDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query FAQQuery {
        faq: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "footer_settings"} }}){
          edges{
            node{
              frontmatter{
                title
              }
            }
          }
        }
      }
    `}
    render={({
      title = 'Help Center',
      subtitle = 'Ви запитуєте - я відповідаю',
      items = [
        {
          question: 'Як проходить сесія',
          answer: 'Enter the answer to your question here. Be thoughtful with your answer, write clearly, and consider adding examples. This can help your visitors get the help they need quickly and easily.'
        },
        {
          question: 'Чи можу я вам довіряти',
          answer: 'Enter the answer to your question here. Be thoughtful with your answer, write clearly, and consider adding examples. This can help your visitors get the help they need quickly and easily.'
        },
        {
          question: 'Чи можна оплатити карточкою',
          answer: 'Enter the answer to your question here. Be thoughtful with your answer, write clearly, and consider adding examples. This can help your visitors get the help they need quickly and easily.'
        },
        {
          question: 'Скидки постійним клієнтам',
          answer: 'Enter the answer to your question here. Be thoughtful with your answer, write clearly, and consider adding examples. This can help your visitors get the help they need quickly and easily.'
        }
      ]
    }) => (
      <FAQ
        title={title}
        subtitle={subtitle}
        items={items}
      />
    )}
  />
);
