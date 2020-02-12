import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Tiles from '../tiles-list';

export default () => (
  <StaticQuery
    query={graphql`
      query ServicesQuery {
        image1: file(relativePath: { eq: "uploads/individual.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 900) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        image2: file(relativePath: { eq: "uploads/couples.jpg" }) {
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
                socialIcons {
                  type
                  url
                }
              }
            }
          }
        }
      }
    `}
    render={({
      title = 'Послуги',
      subtitle = 'With You Every Step of the Way',
      image1,
      image2,
      services = [{
        image: image1,
        title: 'Індивідуальні консультації',
        subtitle: 'A Happier, Healthier You',
        url: '/services/personal'
      }, {
        image: image2,
        title: 'Парні консультації',
        subtitle: 'Here For You',
        url: '/services/couples'
      }, {
        image: image2,
        title: 'Корпоративні послуги',
        subtitle: 'Here For You',
        url: '/services/corporate'
      }]
    }) => (
      <Tiles
        title={title}
        subtitle={subtitle}
        items={services}
        firstTileFullWidth
      />
    )}
  />
);
