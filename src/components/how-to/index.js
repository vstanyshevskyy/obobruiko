import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import HowTo from './HowToDisplay';

// ---
// contentType: homepageHowToSettings
// title: Як прийти на косультацію
// steps:
//   - title: Розкажіть мені про свої труднощі.
//     text: >-
//       Написати можна прямо з цієї сторінки, натиснувши на кнопку ... або
//       забронювавши дзвінок чи зателефонувавши мені.
//     icon: /assets/uploads/fimessagesquare.svg
//   - title: Разом ми призначимо час зустрічі
//     text: Консультации проходят Он-лайн или Лично.
//     icon: /assets/uploads/ficlock.svg
// ---
// query={graphql`
// query CertificatesQuery {
//   certificates: markdownRemark(
//     frontmatter: {
//       contentType: { eq: "certificates_settings" }
//     }
//   ) {
//     frontmatter {
//       pageUrl
//       title
//       certificates {
//         image {
//           relativePath
//           full: childImageSharp {
//             fluid(maxWidth: 1160) {
//               ...GatsbyImageSharpFluid_tracedSVG
//               presentationWidth
//             }
//           }
//         }
//         text
//       }
//     }
//   }
// }
// `}

export default () => (
  <StaticQuery
    query={graphql`
      query howToQuery {
        howTo: markdownRemark(frontmatter: {
          contentType: { eq: "homepageHowToSettings" }
        }){
          frontmatter {
            title
            steps {
              text
              title
              icon {
                relativePath
              }
            }
          }
        }
      }
    `}
    render={({
      howTo: {
        frontmatter: {
          title,
          steps
        }
      }
    }) => (
      <HowTo
        title={title}
        steps={steps}
      />
    )}
  />
);
