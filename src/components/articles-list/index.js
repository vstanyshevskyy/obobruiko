import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Tiles from '../tiles-list';

export default () => (
  <StaticQuery
    query={graphql`
      query ArticlesQuery {
        image1: file(relativePath: { eq: "uploads/bears.jpeg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 900) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        image2: file(relativePath: { eq: "uploads/anxiety.jpeg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 900) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        hero: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "footer_settings"} }}){
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
      title = 'Статті',
      subtitle = 'This is your News section introductory paragraph. Use this space to give background on the articles below, including press coverage, industry updates and useful resources. Take this chance to establish yourself or your business as an authority in the field.',
      image1,
      image2,
      services = [{
        image: image1,
        title: 'Як говорити про проблему і не розлучитись?',
        subtitle: 'Покрокова інструкція з прикладами',
        url: '/articles/how-to-talk-prevent-divorce'
      }, {
        image: image2,
        title: '“Не переймайся!”',
        subtitle: 'знайомство з генералізованим тривожним розладом',
        url: '/articles/dont-worry-anxiety-disorder'
      }]
    }) => (
      <Tiles
        title={title}
        subtitle={subtitle}
        items={services}
      />
    )}
  />
);
