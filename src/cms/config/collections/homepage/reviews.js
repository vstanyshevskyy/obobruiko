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
          widget: 'string',
          required: false
        },
        {
          label: 'Заголовок',
          name: 'title',
          widget: 'boolean',
          default: false
        },
        {
          label: 'Відгуки',
          name: 'reviews',
          widget: 'list',
          fields: [
            {
              label: 'Текст',
              name: 'text',
              widget: 'string'
            },
            {
              label: 'Імя',
              name: 'name',
              widget: 'string'
            }
          ]
        }
      ]
    }
  ]
};
