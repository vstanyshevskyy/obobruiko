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
          widget: 'object',
          required: false,
          summary: '{{fields.name}}',
          fields: [
            {
              label: 'Імя',
              name: 'name',
              widget: 'string',
              required: true
            },
            {
              label: 'Фото',
              name: 'image',
              widget: 'image',
              required: false
            }
          ]
        },
        {
          label: 'Джерело',
          name: 'source',
          widget: 'object',
          required: false,
          fields: [
            {
              label: 'URL',
              name: 'url',
              widget: 'string',
              required: false
            },
            {
              label: 'Текст посилання',
              name: 'text',
              widget: 'string',
              required: false
            },
            {
              label: 'Іконка',
              widget: 'select',
              name: 'socialIcon',
              options: ['Facebook', 'Instagram', 'Linkedin', 'Google', 'Youtube'],
              required: false
            },
          ]
        },
        {
          label: 'Дата',
          name: 'date',
          widget: 'datetime',
          default: '',
          date_format: 'DD.MM.YYYY',
          picker_utc: true,
          required: false
        }
      ]
    }
  ]
};
