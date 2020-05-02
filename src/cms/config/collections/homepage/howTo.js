import languages from '../languageSelect';

export default {
  name: 'howTo',
  label: 'Як прийти на консультацію',
  file: 'content/homepage/howTo.md',
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'homepageHowToSettings'
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
          label: 'Кроки',
          name: 'steps',
          widget: 'list',
          fields: [
            {
              label: 'Заголовок',
              name: 'title',
              widget: 'string',
              default: ''
            },
            {
              label: 'Текст',
              name: 'text',
              widget: 'text',
              default: ''
            },
            {
              label: 'Іконка',
              name: 'icon',
              widget: 'image',
              default: ''
            }
          ]
        }
      ]
    }
  ]
};
