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
      title = 'Будемо знайомі',
      content = `
      <p>Привіт!</p>
      <p>Це – Олеся Бобруйко. Перш за все, я – людина, і можу зрозуміти почуття та переживання іншої людини. А ще, я –  психолог і дбайливо ставлюся до кожного, хто до мене звертається. 
      </p>
      <p>Розкажіть мені свою історію.</p>
      <p>Я допоможу вам побудувати теплі стосунки з найближчою людиною у вашому житті. Ця людина – це ви.</p>
      <p>Ви зможете віднайти любов та підтримку в собі і це те, що залишиться з вами назавжди.</p>
      <p>P.S.: З любові до себе народжується любов до інших.</p>
      `,
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
