import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import AboutMe from './AboutMeDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query AboutMeQuery {
        image: file(relativePath: { eq: "uploads/about.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 4160) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        aboutMe: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "footer_settings"} }}){
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
      title = 'Про мене',
      content = `<p>Ever since I was young, I knew I wanted to get into a career path that would make a difference in people’s lives. This interest led me to study psychological science and eventually a full time job. As a licensed Psychologist in the greater L'viv area, I am committed to the well-being of all my patients and go above and beyond to cater to their needs.</p>
      <p>I truly care for all of my clients, and work diligently to help find them the answers they seek. Since 2000, I have worked with a variety of patients dealing with circumstances that are unique to their lives.</p>`,
      image,
      imageAlt = ''
    }) => (
      <AboutMe
        title={title}
        content={content}
        image={image}
        imageAlt={imageAlt}
      />
    )}
  />
);
