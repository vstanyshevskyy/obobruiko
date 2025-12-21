/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import '../articles/article.less';
import '../pages/pages.less';
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from '../../layouts';
import ThemeContext from '../../context/ThemeContext';
import SEO from '../../components/SEO';
import Values from './components/values';
import Results from './components/results';
import ValuesContext from './contexts/ValuesContext';

import './index.less';

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
    metaDescription,
    fbDescription,
    image,
    image_alt: imageAlt
  } = content.find(c => c.language === language);
  const seoData = Object.assign({
    title, metaDescription, useTitleTemplate: true, url: path, image
  });
  const className = classNames(
    'index-page__content-wrapper',
    'index-page__content-wrapper--page'
  );
  const [questionsMap, setQuestionsMap] = useState({});
  const [values, setValues] = useState([]);

  const VALUES_STORAGE_KEY = `values_map-${language}`;

  useEffect(() => {
    const map = JSON.parse(localStorage.getItem(VALUES_STORAGE_KEY)) || {};
    questions.forEach((q, qidx) => {
      const id = `value-${qidx}`;
      map[id] = {
        ...q,
        id,
        selection: null,
        ...map[id]
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
    localStorage.setItem(VALUES_STORAGE_KEY, JSON.stringify(newQuestionsMap));
  };

  return (
    <Layout isImageFullscreen language={language} useWhiteForNav={useWhiteForNav}>
      <SEO data={seoData} isBlogPost otherLanguages={otherLanguages} />
      <div className={className} id="content">
        <article className="content__page values__page">
          <h1 className="valuesPageName">{title}</h1>
          { image
            ? (
              <GatsbyImage image={image.childImageSharp.gatsbyImageData} alt={imageAlt} className="values-title__image" />
            )
            : null }
          <div className="content__page-wrapper">
            <ValuesContext.Provider value={{
              values, options, valuesMap: questionsMap, onSelectionChange
            }}
            >
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
              <Results language={language} />
            </ValuesContext.Provider>
          </div>
        </article>
      </div>
    </Layout>
  );
};

Content.contextType = ThemeContext;

export default Content;

export const pageQuery = graphql`query valuesQuery {
  page: markdownRemark(frontmatter: {contentType: {eq: "values"}}) {
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
        metaDescription
        fbDescription
        image_alt
        image {
          relativePath
          childImageSharp {
            gatsbyImageData(
              quality: 90
              layout: FULL_WIDTH
            )
          }
        }
      }
    }
  }
}`;
