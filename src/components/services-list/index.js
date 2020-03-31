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
        image3: file(relativePath: { eq: "uploads/workshops.jpg" }) {
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
      title = 'Послуги',
      subtitle = 'With You Every Step of the Way',
      image1,
      image2,
      image3,
      services = [{
        image: image1,
        title: 'Індивідуальне консультування',
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
        url: '/services/individual-counseling'
      }, {
        image: image2,
        title: 'Парні консультації',
        subtitle: '1,5 години в тиждень для вашої пари',
        html: `
        <p>Я можу допомогти вам і вашому партнеру:</p>
        <ul>
          <li>навчитись говорити про те, що не влаштовує, так, щоб слова кожного з вас були почуті, а тарілки залишились цілими
          <li>вирішити конфлікти
          <li>відновити взаєморозуміння
          <li>повернути довіру та близькість у стосунки
          <li>підтримувати теплі взаємини й надалі
        </ul>
        <p>Побудувати теплі надійні стосунки, сповнені любові – можливо. Я покажу вам як саме.</p>
        `,
        url: '/services/couple-counseling'
      }, {
        image: image3,
        title: 'Майстер-класи',
        subtitle: '2+ години для вашої команди',
        html: `
        <p>Ви дізнаєтесь:</p>
        <ul>
        <li>
        які є стилі спілкування, переваги та недоліки кожного зі стилів. А також який стиль ви використовуєте найчастіше
        <li>
        як відмовляти асертивно і потренуєтесь це робити
        <li>
        яка користь від позитивного відгуку і попрактикуєтесь його давати
        <li>
        навіщо потрібен корегуючий відгук і як висловлювати його так, щоб він був доречним, а головне корисним. І звісно ж повправляєтесь давати такий відгук
        </ul>

        <p>Давайте разом покращувати комунікацію у вашій команді.</p>
        `,
        url: '/services/teams-workshops'
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
