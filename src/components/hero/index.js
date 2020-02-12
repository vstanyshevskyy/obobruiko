import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Hero from './HeroDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query HeroQuery {
        image: file(relativePath: { eq: "uploads/hero.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 4160) {
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
      image,
      title = 'Олеся Бобруйко <span>Психолог</span>',
      subtitle = 'Quality Care You Can Count On',
      buttonText = 'Забронювати',
      telephoneNumber = '+380994403712'
    }) => (
      <Hero
        image={image}
        title={title}
        subtitle={subtitle}
        buttonText={buttonText}
        telephoneNumber={telephoneNumber}
      />
    )}
  />
);
