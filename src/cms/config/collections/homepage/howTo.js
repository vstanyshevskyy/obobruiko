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
      label: 'Заголовок',
      name: 'title',
      widget: 'string',
      required: false
    },
    {
      label: 'Кроки',
      name: 'bottomLinks',
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
          widget: 'string',
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
};
