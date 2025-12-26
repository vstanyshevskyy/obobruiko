/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import '../articles/article.less';
import '../pages/pages.less';
import Layout from '../../layouts';
import Questionary from './components/questions';
import ReactMarkdown from '../../components/markdown';

const Content = props => {
  const { data, pageContext } = props;

  const {
    page: {
      id,
      frontmatter: {
        content
      }
    }
  } = data;

  const {
    language
  } = pageContext;
  const {
    title,
    description,
    instruction,
    questions,
    resultTemplate,
    copyResultsTemplate,
    copyButtonText,
    bookConsultationButtonText,
    bookConsultationButtonLink,
    results,
    contentAfterResults,
    contentAfterRecommendedContent,
    publishTime
  } = content.find(c => c.language === language);

  const className = classNames(
    'index-page__content-wrapper',
    'index-page__content-wrapper--page',
    'index-page__content-wrapper--page--questionnaire'
  );
  return (
    <Layout isImageFullscreen language={language}>
      <div className={className} id="content">
        <article className="content__page content__questionnaire">
          <div className="content__page-wrapper">
            <Questionary data={{
              questionnaireName: title,
              description,
              instruction,
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
            />
            <div className="content__questionnaire--after-results-text">
              <ReactMarkdown>{contentAfterResults}</ReactMarkdown>
            </div>

            <div className="content__questionnaire--after-recommended-content-text">
              <ReactMarkdown>{contentAfterRecommendedContent}</ReactMarkdown>
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
        contentAfterResults
        contentAfterRecommendedContent
        publishTime
      }
    }
  }
}`;
