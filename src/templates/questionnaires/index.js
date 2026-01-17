/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import '../articles/article.less';
import '../pages/pages.less';
import './index.less';
import Layout from '../../layouts';
import SEO from '../../components/SEO';
import Questionary from './components/questions';
import { QuestionnaireProvider } from './context/QuestionnaireContext';
import Tiles from '../../components/tiles-list';
import Config from '../../config';
import ReactMarkdown from '../../components/markdown';

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
    pageTitle,
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

  // Filter recommended articles by matching paths and language
  const recommendedArticles = recommendedContent
    ? allArticles.nodes
      .map(node => node.frontmatter.content.find(c => c.language === language
          && recommendedContent.includes(c.path)))
      .filter(Boolean)
    : [];

  const seoData = Object.assign({
    title: pageTitle, metaDescription, useTitleTemplate: true, url: path, image
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
              <QuestionnaireProvider
                data={{
                  questionnaireName: title,
                  description,
                  instruction,
                  contentAfterInstructions,
                  questions: questions.map((q, qidx) => ({
                    ...q,
                    questionText: q.text,
                    id: `${id}-q-${qidx}`,
                    answers: q.answers.map((a, aidx) => ({
                      ...a,
                      id: `${id}-q-${qidx}-a-${aidx}`,
                      defaultChecked: aidx === 0
                    }))
                  })),
                  resultTemplate,
                  copyResultsTemplate,
                  copyButtonText,
                  bookConsultationButtonText,
                  bookConsultationButtonLink,
                  results: results.map((r, ridx) => ({ ...r, id: `${id}-r-${ridx}` })),
                  language
                }}
              >
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
              <div className="content__questionnaire--after-recommended-content-text no-print">
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
        pageTitle
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
          resultSummary
          subscale
          minScore
          maxScore
          color
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
