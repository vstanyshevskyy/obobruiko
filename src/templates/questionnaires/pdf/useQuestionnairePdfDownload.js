import React, { useCallback, useContext, useMemo, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { pdf } from '@react-pdf/renderer';
import { QuestionnaireContext } from '../context/QuestionnaireContext';
import QuestionnairePdfDocument from './QuestionnairePdfDocument';
import {
  buildPdfFileName,
  formatQuestionnaireDate,
  getBookingUrl,
  getVisibleQuestionsWithAnswers,
  normalizePdfContactDetails
} from './helpers';
import { prepareSubscaleResults } from '../utils/scoring';

const useQuestionnairePdfDownload = pdfOverrides => {
  const [isGenerating, setIsGenerating] = useState(false);
  const questionnaireContext = useContext(QuestionnaireContext);
  const footerData = useStaticQuery(graphql`
    query QuestionnairePdfDownloadQuery {
      navigation: markdownRemark(frontmatter: {
        contentType: { eq: "navbar_settings" }
      }) {
        frontmatter {
          content {
            language
            logoText
            slogan
          }
        }
      }
      footer: markdownRemark(frontmatter: {
        contentType: { eq: "footer_settings" }
      }) {
        frontmatter {
          content {
            language
            copyrightText
          }
        }
      }
      contactInfo: markdownRemark(frontmatter: {
        contentType: { eq: "contact_form_settings" }
      }) {
        frontmatter {
          content {
            language
            title
            address
            email
            emailText
            phone
            phoneText
          }
        }
      }
    }
  `);

  const pdfData = useMemo(() => {
    const navigationContent = footerData.navigation.frontmatter.content;
    const footerContent = footerData.footer.frontmatter.content;
    const contactContent = footerData.contactInfo.frontmatter.content;
    const navigationDefaultContent = navigationContent[0];
    const footerDefaultContent = footerContent[0];
    const contactDefaultContent = contactContent[0];
    const resolvedLanguage = pdfOverrides?.language || questionnaireContext?.language || 'UK';
    const localizedNavigation = (
      navigationContent.find(item => item.language === resolvedLanguage) || navigationDefaultContent
    );
    const localizedFooter = (
      footerContent.find(item => item.language === resolvedLanguage) || footerDefaultContent
    );
    const localizedContact = (
      contactContent.find(item => item.language === resolvedLanguage) || contactDefaultContent
    );

    if (pdfOverrides) {
      return {
        siteName: localizedNavigation.logoText,
        siteSlogan: localizedNavigation.slogan,
        formattedDate: formatQuestionnaireDate(resolvedLanguage),
        contactDetails: normalizePdfContactDetails(localizedContact),
        copyrightText: localizedFooter.copyrightText,
        language: resolvedLanguage,
        ...pdfOverrides
      };
    }

    if (!questionnaireContext) {
      return null;
    }

    const {
      questionnaireName,
      scores,
      questions,
      totalScore,
      currentResult,
      subscaleResults,
      hasMultipleSubscalesFlag,
      resultTemplate,
      bookConsultationButtonText,
      bookConsultationButtonLink,
      isOpenupReferrer,
      language,
      hideAnswerValues
    } = questionnaireContext;

    const formattedScore = hasMultipleSubscalesFlag
      ? prepareSubscaleResults(subscaleResults).join(', ')
      : totalScore.toString();

    return {
      siteName: localizedNavigation.logoText,
      siteSlogan: localizedNavigation.slogan,
      questionnaireName,
      formattedDate: formatQuestionnaireDate(language),
      bookingButtonText: bookConsultationButtonText,
      bookingUrl: getBookingUrl({ isOpenupReferrer, bookConsultationButtonLink }),
      resultHeading: resultTemplate.replace('{0}', formattedScore),
      resultSummary: currentResult?.resultSummary || '',
      resultText: currentResult?.text || '',
      questionsWithAnswers: getVisibleQuestionsWithAnswers({
        questions,
        scores,
        totalScore,
        hideAnswerValues,
        language
      }),
      contactDetails: normalizePdfContactDetails(localizedContact),
      copyrightText: localizedFooter.copyrightText,
      language
    };
  }, [
    footerData,
    pdfOverrides,
    questionnaireContext
  ]);

  const downloadPdf = useCallback(async () => {
    if (typeof window === 'undefined' || isGenerating || !pdfData) {
      return;
    }

    setIsGenerating(true);

    try {
      const blob = await pdf(<QuestionnairePdfDocument pdfData={pdfData} />).toBlob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = blobUrl;
      link.download = buildPdfFileName(pdfData.questionnaireName || pdfData.title);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } finally {
      setIsGenerating(false);
    }
  }, [isGenerating, pdfData]);

  return {
    downloadPdf,
    isGenerating
  };
};

export default useQuestionnairePdfDownload;
