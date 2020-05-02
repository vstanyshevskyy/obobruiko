import languages from '../languageSelect';

export default {
  label: 'Навігація',
  name: 'navbar',
  file: 'content/settings/navbar.md',
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'navbar_settings'
    },
    {
      label: 'Контент',
      name: 'content',
      widget: 'list',
      fields: [
        languages,
        {
          name: 'logoText',
          label: 'Лого текст',
          widget: 'string'
        },
        {
          name: 'slogan',
          label: 'Слоган',
          widget: 'string'
        },
        {
          name: 'ctaText',
          label: 'Текст на кнопці',
          widget: 'string'
        },
        {
          label: 'Меню',
          name: 'links',
          widget: 'list',
          fields: [
            {
              label: 'Текст',
              name: 'text',
              widget: 'string'
            },
            {
              label: 'Посилання',
              name: 'url',
              widget: 'string'
            }
          ]
        }
      ]
    }
  ]
};
