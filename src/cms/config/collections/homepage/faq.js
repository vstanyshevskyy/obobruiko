import languages from '../languageSelect';

export default {
  name: 'faq',
  label: 'FAQ',
  file: 'content/homepage/faq.md',
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'homepageFaq'
    },
    {
      label: 'Контент',
      name: 'content',
      widget: 'list',
      fields: [
        languages,
        {
          label: 'Показувати на головній',
          name: 'isEnabled',
          widget: 'boolean',
          default: false
        },
        {
          label: 'Заголовок',
          name: 'title',
          widget: 'string',
          required: false
        },
        {
          label: 'Підзаголовок',
          name: 'subtitle',
          widget: 'text',
          required: false
        },
        {
          label: 'FAQ',
          name: 'faq',
          widget: 'list',
          fields: [
            {
              label: 'Питання',
              name: 'question',
              widget: 'string',
              default: ''
            },
            {
              label: 'Відповідь',
              name: 'answer',
              widget: 'text',
              default: ''
            }
          ]
        }
      ]
    }
  ]
};
