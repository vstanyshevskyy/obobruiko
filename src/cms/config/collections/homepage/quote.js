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
};
