/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import '../articles/article.less';
import '../pages/pages.less';
import './print.css';
import Values from './components/values';
import Layout from '../../layouts';

const Content = ({
  data: {
    page: {
      frontmatter: {
        content
      }
    }
  },
  location: { state: { language, results } }
}) => {
  const {
    title,
    description,
    instruction
  } = content.find(c => c.language === language);

  const className = classNames(
    'index-page__content-wrapper',
    'index-page__content-wrapper--page'
  );

  useEffect(() => {
    window.print();
  }, [])

  return (
    <Layout isImageFullscreen language={language}>
      <div className={className} id="content">
        <article className="content__page">
          <div className="content__page-wrapper">
            <Values
              hideAnswers
              data={{
                questionnaireName: title,
                description,
                instruction,
                values: results
              }}
            />
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default Content;

export const pageQuery = graphql`
  query valuesPrintQuery {
    page: markdownRemark(
      frontmatter: {
        contentType: { eq: "values" }
      }
    ) {
      frontmatter {
        content {
          language
          path
          title
          description
          instruction
        }
      }
    }
  }
`;
