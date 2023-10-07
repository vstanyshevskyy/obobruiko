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
          label: 'Меню',
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