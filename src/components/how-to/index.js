import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import HowTo from './HowToDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query howToQuery {
        howTo: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "footer_settings"} }}){
          edges{
            node{
              frontmatter{
                links {
                  text
                  url
                }
              }
            }
          }
        }
      }
    `}
    render={({
      title = 'Як прийти на консультацію?',
      steps = [{
        title: 'Розкажіть мені про свої труднощі.',
        text: 'Написати можна прямо з цієї сторінки, натиснувши на кнопку ... або забронювавши дзвінок чи зателефонувавши мені.'
      }, {
        title: 'Разом ми призначимо час зустрічі',
        text: 'Консультации проходят Он-лайн или Лично.'
      }]
    }) => (
      <HowTo
        title={title}
        steps={steps}
      />
    )}
  />
);
