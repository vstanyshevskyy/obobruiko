import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import { FaCalendarAlt as CalendarIcon, FaDownload as DownloadIcon, FaTrash as TrashIcon } from 'react-icons/fa';
import Layout from '../../layouts';
import ThemeContext from '../../context/ThemeContext';
import SEO from '../../components/SEO';
import ReactMarkdown from '../../components/markdown';
import { useOpenupReferrer } from '../../hooks/useReferrer';
import useQuestionnairePdfDownload from '../questionnaires/pdf/useQuestionnairePdfDownload';
import '../questionnaires/index.less';
import './index.less';

const SocraticQuestioning = ({ 
  data: {
    page: {
      frontmatter: { content }
    }
  },
  pageContext: { language, otherLanguages }
}) => {
  const contentData = content.find(c => c.language === language);
  const {
    title,
    description,
    imageAlt,
    thoughtLabel,
    questions,
    saveButtonText,
    resetButtonText,
    resetConfirmText,
    bookConsultationButtonText,
    bookConsultationButtonLinkPrivate,
    bookConsultationButtonLinkOpenup
  } = contentData;

  const STORAGE_KEY = `socratic-questioning-${language}`;

  const [thought, setThought] = useState('');
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [hasData, setHasData] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const { thought: savedThought, answers: savedAnswers } = JSON.parse(saved);
          setThought(savedThought || '');
          setAnswers(savedAnswers || Array(questions.length).fill(''));
          setHasData(savedThought || savedAnswers.some(a => a));
        } catch (e) {
          console.error('Error loading from localStorage:', e);
        }
      }
    }
  }, [STORAGE_KEY, questions.length]);

  // Save to localStorage on changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = { thought, answers };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setHasData(thought || answers.some(a => a));
    }
  }, [thought, answers, STORAGE_KEY]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleReset = () => {
    if (typeof window !== 'undefined' && window.confirm(resetConfirmText)) {
      setThought('');
      setAnswers(Array(questions.length).fill(''));
      localStorage.removeItem(STORAGE_KEY);
      setHasData(false);
    }
  };

  const isOpenupReferrer = useOpenupReferrer();

  const isBookingButtonVisible = bookConsultationButtonText && (bookConsultationButtonLinkPrivate || bookConsultationButtonLinkOpenup);
  
  const bookingUrl = isOpenupReferrer 
    ? bookConsultationButtonLinkOpenup
    : bookConsultationButtonLinkPrivate;

  const locale = language === 'EN' ? 'en-US' : 'uk-UA';
  const pdfQuestionsWithAnswers = [
    {
      id: 'thought',
      text: thoughtLabel,
      answerText: thought.trim(),
      showValue: false
    },
    ...questions.map((questionObj, index) => ({
      id: `question-${index}`,
      text: questionObj.question,
      answerText: answers[index]?.trim() || '',
      showValue: false
    }))
  ].filter(item => item.answerText);

  const { downloadPdf, isGenerating } = useQuestionnairePdfDownload({
    questionnaireName: title,
    formattedDate: new Date().toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    bookingButtonText: bookConsultationButtonText,
    bookingUrl: isBookingButtonVisible ? bookingUrl : '',
    resultText: description,
    questionsWithAnswers: pdfQuestionsWithAnswers,
    language
  });

  return (
    <ThemeContext.Consumer>
      {({ isDarkModeEnabled }) => {
        const className = classNames(
          'index-page__content-wrapper',
          'index-page__content-wrapper--page',
          'index-page__content-wrapper--page--questionnaire',
          {
            'index-page__content-wrapper--dark': isDarkModeEnabled
          }
        );

        return (
          <Layout language={language} useWhiteForNav={false} otherLanguages={otherLanguages}>
            <div className={className} id="content">
              <article className="content__page content__questionnaire">
                <div className="content__page-wrapper">
                  <div className="questionnaire">
                    <h1 className="questionnaireName">{title}</h1>
                    <div className="questionnaire__date-print">
                      {new Date().toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <img 
                      src="/assets/uploads/Johann-Heinrich-Wilhelm-Tischbein-Diogenes-Searching-for-an-Honest-Man-1780.webp" 
                      alt={imageAlt}
                      className="socratic-questioning__image no-print"
                    />
                    <div className="description">
                      <ReactMarkdown>{description}</ReactMarkdown>
                    </div>

                    {hasData && (
                      <div className="socratic-questioning__reset-wrapper no-print">
                        <button 
                          type="button" 
                          onClick={handleReset} 
                          className="btn socratic-questioning__reset-btn"
                        >
                          <TrashIcon /> {resetButtonText}
                        </button>
                      </div>
                    )}

                    <form className="socratic-questioning__form" onSubmit={(e) => e.preventDefault()}>
                      <div className="socratic-questioning__field">
                        <label htmlFor="thought" className="socratic-questioning__label">
                          {thoughtLabel}
                        </label>
                        <textarea
                          id="thought"
                          className="socratic-questioning__textarea socratic-questioning__textarea--thought"
                          value={thought}
                          onChange={(e) => setThought(e.target.value)}
                          rows={3}
                        />
                      </div>

                      {questions.map((questionObj, index) => (
                        <div key={index} className="socratic-questioning__field">
                          <label 
                            htmlFor={`question-${index}`}
                            className="socratic-questioning__label"
                          >
                            {questionObj.question}
                          </label>
                          <textarea
                            id={`question-${index}`}
                            className="socratic-questioning__textarea"
                            value={answers[index]}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                            rows={4}
                          />
                        </div>
                      ))}

                      <div className="questionnaire__score-screen">
                        <div className="score__ctas">
                            <button
                              className="btn score__btn score__btn--print"
                              type="button"
                              onClick={downloadPdf}
                              disabled={isGenerating || !hasData}
                            >
                                <DownloadIcon />
                                {isGenerating
                                  ? (language === 'EN' ? 'Preparing PDF...' : 'Готуємо PDF...')
                                  : saveButtonText}
                            </button>
                            {isBookingButtonVisible && (
                            <a href={bookingUrl} className="btn score__btn score__btn--book">
                                <CalendarIcon />
                                {bookConsultationButtonText}
                            </a>
                            )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </article>
            </div>
          </Layout>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default SocraticQuestioning;

export const pageQuery = graphql`
  query SocraticQuestioningQuery {
    page: markdownRemark(frontmatter: { 
      contentType: { eq: "socratic_questioning" } 
    }) {
      frontmatter {
        content {
          language
          path
          title
          subtitle
          seoTitle
          description
          metaDescription
          fbTitle
          fbDescription
          imageAlt
          image {
            relativePath
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
          image_alt
          thoughtLabel
          questions {
            question
          }
          saveButtonText
          resetButtonText
          resetConfirmText
          printTitle
          bookConsultationButtonText
          bookConsultationButtonLinkPrivate
          bookConsultationButtonLinkOpenup
          useWhiteForNav
        }
      }
    }
  }
`;

export const Head = ({ data, pageContext }) => {
  const { language, otherLanguages } = pageContext;
  const content = data.page.frontmatter.content.find(c => c.language === language);
  
  const isDefaultLanguage = language === 'UK';
  const urlPath = isDefaultLanguage ? content.path : `/en${content.path}`;
  
  const seoData = {
    title: content.seoTitle || content.title,
    fbTitle: content.fbTitle,
    metaDescription: content.metaDescription,
    fbDescription: content.fbDescription,
    excerpt: content.description,
    url: urlPath,
    useTitleTemplate: false,
    image: {
      relativePath: 'uploads/Johann-Heinrich-Wilhelm-Tischbein-Diogenes-Searching-for-an-Honest-Man-1780.webp'
    }
  };
  
  const Config = require('../../config');
  const fullOtherLanguages = {
    'uk': `${Config.url}${otherLanguages.uk}`,
    'en': `${Config.url}${otherLanguages.en}`,
    'x-default': `${Config.url}${otherLanguages.uk}`
  };
  
  return <SEO language={language} data={seoData} otherLanguages={fullOtherLanguages} />;
};
