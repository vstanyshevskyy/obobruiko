/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import Img from 'gatsby-image';
import ReactMarkdown from '../../components/markdown';
import '../articles/article.less';
import '../pages/pages.less';
import Layout from '../../layouts';
import ThemeContext from '../../context/ThemeContext';
import SEO from '../../components/SEO';
import Questionary from './components/questions';

export default class Content extends React.Component {
  render() {
    const {
      data: {
        page: {
          id,
          frontmatter: {
            content
          }
        }
      },
      pageContext: {
        language,
        otherLanguages
      }
    } = this.props;
    const {
      path,
      title,
      description,
      instruction,
      questions,
      results,
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
    return (
      <Layout isImageFullscreen language={language} useWhiteForNav={useWhiteForNav}>
        <SEO data={seoData} isBlogPost otherLanguages={otherLanguages} />
        <div className={className} id="content">
          <article className="content__page">
            <div className="content__page-wrapper">
              <div
                className="content__content"
                ref={c => { this.contentNode = c; }}
              >
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
                  results: results.map((r, ridx) => ({ ...r, id: `${id}-r-${ridx}` }))
                }}
                />
              </div>
            </div>
          </article>
        </div>
      </Layout>
    );
  }
}

Content.contextType = ThemeContext;

export const pageQuery = graphql`
  query QuestionariesQuery($slug: String!) {
    page: markdownRemark(frontmatter: { content: {elemMatch: {path: {eq: $slug}}}}) {
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
            minScore
            answers {
              value
              text
            }
          }
          results {
            text
            minScore
            maxScore
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
