import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Hero from './HeroDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query HeroQuery {
        image: file(relativePath: { eq: "uploads/hero3.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 4160, srcSetBreakpoints: [768]) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 768) {
              ...GatsbyImageSharpFixed
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
      title = 'Якщо вам бракує любові і підтримки. Розкажіть мені про свої труднощі.<br />Я допоможу вам побудувати теплі стосунки з собою та партнером.',
      subtitle = 'Quality Care You Can Count On',
      buttonText = 'Зв\'язатися зі мною',
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
