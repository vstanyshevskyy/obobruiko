/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import '../articles/article.less';
import '../pages/pages.less';
import './index.less';
import Layout from '../../layouts';
import SEO from '../../components/SEO';
import Questionary from './components/questions';
import Tiles from '../../components/tiles-list';
import Config from '../../config';
import ReactMarkdown from '../../components/markdown';
import { QuestionnaireProvider } from './context/QuestionnaireContext';
import { transformQuestions, transformResults } from './utils/transformData';

const Content = props => {
  const {
    data: {
      page: {
        id,
        frontmatter: {
          content
        }
      },
      allArticles
    },
    pageContext: {
      language,
      otherLanguages
    }
  } = props;
  const {
    path,
    title,
    description,
    instruction,
    contentAfterInstructions,
    questions,
    resultTemplate,
    copyResultsTemplate,
    copyButtonText,
    bookConsultationButtonText,
    bookConsultationButtonLink,
    results,
    recommendedContent,
    recommendedContentTitle,
    recommendedContentDescription,
    contentAfterResults,
    contentAfterRecommendedContent,
    publishTime,
    useWhiteForNav,
    metaDescription,
    fbDescription,
    image
  } = content.find(c => c.language === language);

  // Transform data using utility functions
  const transformedQuestions = useMemo(
    () => transformQuestions(questions, id),
    [questions, id]
  );

  const transformedResults = useMemo(
    () => transformResults(results, id),
    [results, id]
  );

  const questionnaireData = useMemo(
    () => ({
      questionnaireName: title,
      description,
      instruction,
      contentAfterInstructions,
      questions: transformedQuestions,
      resultTemplate,
      copyResultsTemplate,
      copyButtonText,
      bookConsultationButtonText,
      bookConsultationButtonLink,
      results: transformedResults
    }),
    [
      title,
      description,
      instruction,
      contentAfterInstructions,
      transformedQuestions,
      resultTemplate,
      copyResultsTemplate,
      copyButtonText,
      bookConsultationButtonText,
      bookConsultationButtonLink,
      transformedResults
    ]
  );

  // Filter recommended articles by matching paths and language
  const recommendedArticles = recommendedContent
    ? allArticles.nodes
      .map(node => node.frontmatter.content.find(c => c.language === language
          && recommendedContent.includes(c.path)))
      .filter(Boolean)
    : [];

  const seoData = Object.assign({
    title, metaDescription, useTitleTemplate: true, url: path, image
  });
  const className = classNames(
    'index-page__content-wrapper',
    'index-page__content-wrapper--page',
    'index-page__content-wrapper--page--questionnaire'
  );

  return (
    <Layout isImageFullscreen language={language} useWhiteForNav={useWhiteForNav}>
      <SEO data={seoData} isBlogPost otherLanguages={otherLanguages} />
      <div className={className} id="content">
        <article className="content__page content__questionnaire">
          <div className="content__page-wrapper">
            <div className="">
              <QuestionnaireProvider data={questionnaireData}>
                <Questionary />
              </QuestionnaireProvider>
              <div className="content__questionnaire--after-results-text">
                <ReactMarkdown>{contentAfterResults}</ReactMarkdown>
              </div>
              {recommendedArticles.length > 0 && (
                <Tiles
                  id="recommended-content"
                  title={recommendedContentTitle}
                  subtitle={recommendedContentDescription}
                  items={recommendedArticles.map(a => ({
                    ...a,
                    url: `${language === Config.languages.find(l => l.isDefault).title
                      ? ''
                      : `/${language.toLowerCase()}`}${a.path}`
                  }))}
                />
              )}
              <div className="content__questionnaire--after-recommended-content-text">
                <ReactMarkdown>{contentAfterRecommendedContent}</ReactMarkdown>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default Content;

export const pageQuery = graphql`query questionnairesQuery($slug: String!) {
  page: markdownRemark(frontmatter: {content: {elemMatch: {path: {eq: $slug}}}}) {
    id
    frontmatter {
      content {
        language
        path
        title
        description
        instruction
        contentAfterInstructions
        questions {
          text
          subscale
          minScore
          answers {
            value
            text
          }
        }
        resultTemplate
        copyButtonText
        bookConsultationButtonText
        bookConsultationButtonLink
        copyResultsTemplate
        results {
          text
          subscale
          minScore
          maxScore
        }
        recommendedContent
        recommendedContentTitle
        recommendedContentDescription
        contentAfterResults
        contentAfterRecommendedContent
        publishTime
        useWhiteForNav
        metaDescription
        fbDescription
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
  allArticles: allMarkdownRemark(
    filter: {
      fields: {
        collection: {
          eq: "articles"
        }
      }
    }
  ) {
    nodes {
      frontmatter {
        content {
          language
          path
          title
          subtitle
          image {
            relativePath
            childImageSharp {
              gatsbyImageData(quality: 99, layout: FULL_WIDTH)
            }
          }
          image_alt
        }
      }
    }
  }
}`;
