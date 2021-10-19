import languages from '../languageSelect';

export default {
  name: 'services',
  label: 'Послуги',
  file: 'content/homepage/services.md',
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'homepageServices'
    },
    {
      label: 'Контент',
      name: 'content',
      widget: 'list',
      fields: [
        languages,
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
          label: 'Послуги',
          name: 'services',
          widget: 'list',
          fields: [
            {
              label: 'Заголовок',
              name: 'title',
              widget: 'string',
              default: ''
            },
            {
              label: 'Зображення',
              name: 'image',
              widget: 'image',
              default: ''
            },
            {
              label: 'Текст',
              name: 'text',
              widget: 'markdown',
              default: ''
            },
            {
              label: 'Текст посилання',
              name: 'linkText',
              widget: 'string',
              default: '',
              required: false
            },
            {
              label: 'Посилання',
              name: 'link',
              widget: 'string',
              default: '',
              required: false
            }
          ]
        }
      ]
    }
  ]
};
