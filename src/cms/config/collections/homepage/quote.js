import languages from '../languageSelect';

export default {
  name: 'quote',
  label: 'Цитата',
  file: 'content/homepage/quote.md',
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'homepageQuoteSettings'
    },
    {
      label: 'Контент',
      name: 'content',
      widget: 'list',
      fields: [
        languages,
        {
          label: 'Текст',
          name: 'text',
          widget: 'markdown',
          required: false
        },
        {
          label: 'Автор',
          name: 'author',
          widget: 'string',
          required: false
        }
      ]
    }
  ]
};
