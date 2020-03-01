import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import ServicesDisplay from './ServicesDisplay';

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
        subtitle: '1 година в тиждень для себе',
        html: `
          <p>Ми можемо попрацювати над:</p>
          <ul>
            <li>Підвищенням самооцінки
            <li>Пошуком внутрішніх бажань і ресурсів
            <li>Подоланням страхів
            <li>Прийняттям рішень​
            <li>Постановкою та досягненням цілей
          </ul>
          <p>
          Усе, що потрібно вже є всередині вас.<br />
          Разом, ми можемо знайти та подолати бар'єри,<br />
          що перешкоджають досягненню ваших цілей.
          </p>
          `,
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
      <ServicesDisplay
        title={title}
        subtitle={subtitle}
        services={services}
      />
    )}
  />
);
