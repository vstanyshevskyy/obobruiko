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
      subtitle = 'You Ask - I Answer',
      items = [
        {
          question: 'Як проходить сесія',
          answer: 'Якось так'
        },
        {
          question: 'Чи можу я вам довіряти',
          answer: 'Канєшно'
        },
        {
          question: 'Чи можна оплатити карточкою',
          answer: 'Скоро можна буде'
        },
        {
          question: 'Скидки постійним клієнтам',
          answer: '5 сесій за ціною 6'
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
