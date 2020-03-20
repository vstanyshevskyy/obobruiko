export default {
  name: 'aboutMe',
  label: 'Про мене',
  file: 'content/homepage/about-me.md',
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'homepageAboutMeSettings'
    },
    {
      label: 'Заголовок',
      name: 'title',
      widget: 'string',
      required: false
    },
    {
      label: 'Текст',
      name: 'text',
      widget: 'markdown',
      required: false
    },
    {
      label: 'Фото',
      name: 'image',
      widget: 'image',
      required: false
    },
    {
      label: 'Фото ALT',
      name: 'imageAlt',
      widget: 'string',
      required: false
    },
    {
      label: 'Текст кнопки',
      name: 'ctaText',
      widget: 'string',
      required: false
    },
    {
      label: 'Посилання кнопки',
      name: 'ctaHref',
      widget: 'string',
      required: false
    }
  ]
};
