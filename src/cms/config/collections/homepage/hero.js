import languages from '../languageSelect';

export default {
  name: 'hero',
  label: 'Hero',
  file: 'content/homepage/hero.md',
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'homepageHeroSettings'
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
          label: 'Підзаголовок',
          name: 'subtitle',
          widget: 'markdown',
          required: false
        },
        {
          label: 'Текст Кнопки',
          name: 'buttonText',
          widget: 'string',
          required: false
        },
        {
          label: 'Посилання кнопки',
          name: 'buttonHref',
          widget: 'string',
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
        }
      ]
    }
  ]
};
