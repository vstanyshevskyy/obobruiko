/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import '../articles/article.less';
import '../pages/pages.less';
import Layout from '../../layouts';
import ThemeContext from '../../context/ThemeContext';
import SEO from '../../components/SEO';
import Values from './components/values';
import Results from './components/results';
import ValuesContext from './contexts/ValuesContext';

const Content = ({
  data: {
    page: {
      frontmatter: {
        content
      }
    }
  },
  pageContext: {
    language,
    otherLanguages
  }
}) => {
  const {
    path,
    title,
    description,
    instruction,
    questions,
    options,
    publishTime,
    useWhiteForNav,
    metaKeywords,
    metaDescription,
    fbDescription,
    image
  } = content.find(c => c.language === language);
  const seoData = Object.assign({
    title, metaKeywords, metaDescription, useTitleTemplate: true, url: path, image
  });
  const className = classNames(
    'index-page__content-wrapper',
    'index-page__content-wrapper--page'
  );
  const [questionsMap, setQuestionsMap] = useState({});
  const [values, setValues] = useState([]);

  useEffect(() => {
    const map = {};
    questions.forEach((q, qidx) => {
      const id = `value-${qidx}`;
      map[id] = {
        ...q,
        id,
        selection: null
      };
    });
    setQuestionsMap(map);
    setValues(Object.values(map));
  }, []);

  const onSelectionChange = ({ questionId, value }) => {
    const newQuestionsMap = { ...questionsMap };
    newQuestionsMap[questionId].selection = value;
    setQuestionsMap(newQuestionsMap);
    setValues(Object.values(newQuestionsMap));
  };

  return (
    <Layout isImageFullscreen language={language} useWhiteForNav={useWhiteForNav}>
      <SEO data={seoData} isBlogPost otherLanguages={otherLanguages} />
      <div className={className} id="content">
        <article className="content__page">
          <div className="content__page-wrapper">
            <ValuesContext.Provider value={{ values, options, onSelectionChange }}>
              <div
                className=""
                // ref={c => { this.contentNode = c; }}
              >
                <Values
                  data={{
                    questionnaireName: title,
                    description,
                    instruction,
                    values
                  }}
                />
              </div>
              <Results />
            </ValuesContext.Provider>
          </div>
        </article>
      </div>
    </Layout>
  );
};

Content.contextType = ThemeContext;

export default Content;

export const pageQuery = graphql`
  query valuesQuery {
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
          questions {
            text
            name
          }
          options {
            very_important
            important
            not_important
          }
          publishTime
          useWhiteForNav
          metaKeywords
          metaDescription
          fbDescription
          image {
            relativePath
            childImageSharp {
              fluid(maxHeight: 1160, quality: 90) {
                ...GatsbyImageSharpFluid_tracedSVG
                presentationWidth
              }
            }
          }
        }
      }
    }
  }
`;
