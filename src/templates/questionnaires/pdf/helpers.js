const DEFAULT_BOOKING_URL = 'https://my.openup.com/book-session/olesia-bobruiko/session-type';

const isCheckboxQuestion = question => question.type === 'checkbox';

export const getBookingUrl = ({ isOpenupReferrer, bookConsultationButtonLink }) => (
  isOpenupReferrer ? DEFAULT_BOOKING_URL : bookConsultationButtonLink
);

export const formatQuestionnaireDate = language => new Date().toLocaleDateString(
  language === 'EN' ? 'en-US' : 'uk-UA',
  { year: 'numeric', month: 'long', day: 'numeric' }
);

export const normalizePdfText = text => {
  if (typeof text !== 'string') {
    return text;
  }

  return text
    .replace(/\s*🇩🇰\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export const normalizePdfContactDetails = contactDetails => {
  if (!contactDetails) {
    return contactDetails;
  }

  return {
    ...contactDetails,
    title: normalizePdfText(contactDetails.title),
    address: normalizePdfText(contactDetails.address),
    emailText: normalizePdfText(contactDetails.emailText),
    phoneText: normalizePdfText(contactDetails.phoneText)
  };
};

export const getVisibleQuestionsWithAnswers = ({
  questions,
  scores,
  totalScore,
  hideAnswerValues,
  language
}) => questions
  .filter(question => totalScore >= (question.minScore || 0))
  .map(question => {
    const selectedAnswerId = scores[question.id];
    const defaultAnswer = isCheckboxQuestion(question)
      ? { id: null, text: language === 'EN' ? 'No' : 'Ні', value: 0 }
      : question.answers.find(answer => answer.defaultChecked) || null;
    const selectedAnswer = (
      question.answers.find(answer => answer.id === selectedAnswerId) || defaultAnswer
    );

    return {
      id: question.id,
      text: question.questionText,
      answerText: selectedAnswer?.text || '',
      answerValue: selectedAnswer?.value || 0,
      showValue: !hideAnswerValues
    };
  })
  .filter(question => question.answerText);

export const buildPdfFileName = questionnaireName => {
  const safeName = questionnaireName
    .replace(/[\\/:*?"<>|]/g, '')
    .trim()
    .replace(/\s+/g, '-');

  return `${safeName || 'questionnaire-results'}-${new Date().toISOString().slice(0, 10)}.pdf`;
};
