import languages from '../languageSelect';

export default {
  label: 'Відгуки',
  name: 'reviews',
  file: 'content/homepage/reviews.md',
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'reviews'
    },
    {
      label: 'Контент',
      name: 'content',
      widget: 'list',
      fields: [
        languages,
        {
          label: 'Показувати на сторінці',
          name: 'isEnabled',
          widget: 'boolean',
          required: false
        },
        {
          label: 'Заголовок',
          name: 'title',
          widget: 'string',
          default: ''
        },
        {
          label: 'Відгуки',
          name: 'reviews',
          widget: 'list',
          summary: '{{fields.author.name}} - {{fields.date}}',
          fields: [
            {
              label: 'Текст',
              name: 'text',
              widget: 'markdown'
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
    }
  ]
};
