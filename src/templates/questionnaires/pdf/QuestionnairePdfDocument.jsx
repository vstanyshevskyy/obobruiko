/* eslint-disable jsx-a11y/anchor-is-valid, react/prop-types */
import React from 'react';
import {
  Document,
  Font,
  Page,
  Text,
  View,
  Link,
  StyleSheet
} from '@react-pdf/renderer';
import PdfMarkdown from './PdfMarkdown';
import PDF_BRAND from './constants';

Font.register({
  family: 'NotoSans',
  fonts: [
    { src: '/fonts/NotoSans-Regular.ttf', fontWeight: 400, fontStyle: 'normal' },
    { src: '/fonts/NotoSans-Bold.ttf', fontWeight: 700, fontStyle: 'normal' },
    { src: '/fonts/NotoSans-Italic.ttf', fontWeight: 400, fontStyle: 'italic' },
    { src: '/fonts/NotoSans-BoldItalic.ttf', fontWeight: 700, fontStyle: 'italic' }
  ]
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 36,
    fontFamily: 'NotoSans',
    fontSize: 11,
    lineHeight: 1.5,
    color: PDF_BRAND.colors.text,
    backgroundColor: PDF_BRAND.colors.white
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 18,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: PDF_BRAND.colors.border
  },
  brandWrap: {
    maxWidth: '62%'
  },
  brand: {
    fontSize: 14,
    fontFamily: 'NotoSans',
    fontWeight: 700,
    color: PDF_BRAND.colors.text
  },
  brandSlogan: {
    marginTop: 4,
    fontSize: 9,
    color: PDF_BRAND.colors.muted
  },
  bookingLink: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: PDF_BRAND.colors.accent,
    color: PDF_BRAND.colors.white,
    textDecoration: 'none',
    fontSize: 9,
    fontFamily: 'NotoSans',
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  title: {
    fontSize: 22,
    lineHeight: 1.3,
    fontFamily: 'NotoSans',
    fontWeight: 700,
    textAlign: 'center'
  },
  meta: {
    marginTop: 8,
    fontSize: 10,
    color: PDF_BRAND.colors.muted,
    textAlign: 'center'
  },
  section: {
    marginTop: 22
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'NotoSans',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: PDF_BRAND.colors.accent,
    marginBottom: 10,
    textAlign: 'center'
  },
  resultCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: PDF_BRAND.colors.border,
    backgroundColor: PDF_BRAND.colors.background
  },
  resultScore: {
    fontSize: 18,
    lineHeight: 1.4,
    fontFamily: 'NotoSans',
    fontWeight: 700
  },
  resultSummary: {
    marginTop: 8,
    fontSize: 11,
    lineHeight: 1.5,
    fontFamily: 'NotoSans',
    fontWeight: 700
  },
  questionCard: {
    padding: 14,
    borderWidth: 1,
    borderColor: PDF_BRAND.colors.border,
    marginBottom: 10
  },
  symptomSection: {
    marginTop: 18
  },
  symptomGroup: {
    marginBottom: 12
  },
  symptomGroupTitle: {
    marginBottom: 6,
    fontSize: 11,
    fontFamily: 'NotoSans',
    fontWeight: 700
  },
  questionText: {
    fontSize: 11,
    lineHeight: 1.5,
    fontFamily: 'NotoSans',
    fontWeight: 700
  },
  answerText: {
    marginTop: 6,
    color: PDF_BRAND.colors.muted
  },
  contactSection: {
    marginTop: 24,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: PDF_BRAND.colors.border
  },
  pageFooter: {
    position: 'absolute',
    left: 36,
    right: 36,
    bottom: 24,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: PDF_BRAND.colors.border,
    textAlign: 'center'
  },
  contactTitle: {
    fontSize: 10,
    fontFamily: 'NotoSans',
    fontWeight: 700,
    marginBottom: 6
  },
  footerText: {
    fontSize: 9,
    color: PDF_BRAND.colors.muted,
    marginBottom: 3
  },
  footerLink: {
    color: PDF_BRAND.colors.text,
    textDecoration: 'none'
  },
  copyright: {
    fontSize: 8,
    color: PDF_BRAND.colors.muted
  },
  paragraph: {
    marginBottom: 8,
    fontSize: 11,
    lineHeight: 1.6
  },
  headingLarge: {
    marginTop: 4,
    marginBottom: 8,
    fontSize: 13,
    fontFamily: 'NotoSans',
    fontWeight: 700
  },
  headingSmall: {
    marginTop: 4,
    marginBottom: 8,
    fontSize: 11,
    fontFamily: 'NotoSans',
    fontWeight: 700
  },
  strong: {
    fontFamily: 'NotoSans',
    fontWeight: 700
  },
  emphasis: {
    fontFamily: 'NotoSans',
    fontStyle: 'italic'
  },
  inlineCode: {
    fontFamily: 'NotoSans'
  },
  link: {
    color: PDF_BRAND.colors.accent,
    textDecoration: 'underline'
  },
  list: {
    marginBottom: 8
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6
  },
  listBullet: {
    width: 16,
    fontFamily: 'NotoSans',
    fontWeight: 700
  },
  listContent: {
    flex: 1
  },
  blockquote: {
    borderLeftWidth: 3,
    borderLeftColor: PDF_BRAND.colors.border,
    paddingLeft: 10,
    marginBottom: 8
  },
  rule: {
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: PDF_BRAND.colors.border
  }
});

function QuestionnairePdfDocument({ pdfData }) {
  const {
    siteName,
    siteSlogan,
    questionnaireName,
    title,
    formattedDate,
    bookingButtonText,
    bookingUrl,
    resultHeading,
    resultSummary,
    resultText,
    questionsWithAnswers,
    selectedSymptoms,
    contactDetails,
    copyrightText,
    language
  } = pdfData;

  const documentTitle = questionnaireName || title;
  const answersTitle = language === 'EN' ? 'Your answers' : 'Ваші відповіді';
  const symptomsTitle = language === 'EN' ? 'Selected symptoms' : 'Обрані симптоми';
  const footerFallbackTitle = language === 'EN' ? 'Contact information' : 'Контактна інформація';
  const hasResultSection = Boolean(resultHeading || resultSummary || resultText);
  const hasSelectedSymptoms = Boolean(selectedSymptoms?.length);

  return (
    <Document
      title={documentTitle}
      author={siteName}
      subject={documentTitle}
      creator={siteName}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.brandWrap}>
            <Text style={styles.brand}>{siteName}</Text>
            {siteSlogan ? <Text style={styles.brandSlogan}>{siteSlogan}</Text> : null}
          </View>
          {bookingButtonText && bookingUrl ? (
            <Link src={bookingUrl} style={styles.bookingLink}>
              {bookingButtonText}
            </Link>
          ) : null}
        </View>

        <Text style={styles.title}>{documentTitle}</Text>
        <Text style={styles.meta}>{formattedDate}</Text>

        {hasResultSection ? (
          <View style={styles.section}>
            <View style={styles.resultCard}>
              {resultHeading ? (
                <PdfMarkdown styles={styles} paragraphStyle={styles.resultScore}>
                  {resultHeading}
                </PdfMarkdown>
              ) : null}
              {resultSummary ? <Text style={styles.resultSummary}>{resultSummary}</Text> : null}
              {resultText ? <PdfMarkdown styles={styles}>{resultText}</PdfMarkdown> : null}
            </View>
          </View>
        ) : null}

        {hasSelectedSymptoms ? (
          <View style={[styles.section, styles.symptomSection]}>
            <Text style={styles.sectionTitle}>{symptomsTitle}</Text>
            {selectedSymptoms.map(section => (
              <View key={section.title} style={styles.questionCard}>
                <Text style={styles.questionText}>{section.title}</Text>
                {section.groups.map(group => (
                  <View key={group.title} style={styles.symptomGroup}>
                    <Text style={styles.symptomGroupTitle}>{group.title}</Text>
                    {group.items.map(item => (
                      <View key={`${group.title}-${item}`} style={styles.listItem}>
                        <Text style={styles.listBullet}>•</Text>
                        <Text style={styles.listContent}>{item}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{answersTitle}</Text>
          {questionsWithAnswers.map(question => (
            <View key={question.id} style={styles.questionCard} wrap={false}>
              <Text style={styles.questionText}>{question.text}</Text>
              <Text style={styles.answerText}>
                {question.answerText}
                {question.showValue ? ` (${question.answerValue > 0 ? '+' : ''}${question.answerValue})` : ''}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>
            {contactDetails?.title || footerFallbackTitle}
          </Text>
          {contactDetails?.address ? (
            <Text style={styles.footerText}>{contactDetails.address}</Text>
          ) : null}
          {contactDetails?.emailText ? (
            <Link
              href={`mailto:${contactDetails.email}`}
              src={`mailto:${contactDetails.email}`}
              style={[styles.footerText, styles.footerLink]}
            >
              {contactDetails.emailText}
            </Link>
          ) : null}
          {contactDetails?.phoneText ? (
            <Link
              href={`tel:${contactDetails.phone}`}
              src={`tel:${contactDetails.phone}`}
              style={[styles.footerText, styles.footerLink]}
            >
              {contactDetails.phoneText}
            </Link>
          ) : null}
        </View>

        {copyrightText ? (
          <View style={styles.pageFooter} fixed>
            <PdfMarkdown styles={styles} paragraphStyle={styles.copyright}>
              {copyrightText}
            </PdfMarkdown>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}

export default QuestionnairePdfDocument;
