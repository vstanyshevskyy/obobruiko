import languages from '../languageSelect';

export default {
  label: 'Футер',
  name: 'footer',
  file: 'content/settings/footer.md',
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'footer_settings'
    },
    {
      label: 'Контент',
      name: 'content',
      widget: 'list',
      fields: [
        languages,
        {
          label: 'Копірайт',
          name: 'copyrightText',
          widget: 'string'
        },
        {
          label: 'Посилання в самом у низу',
          name: 'bottomLinks',
          widget: 'list',
          fields: [
            {
              label: 'Текст',
              name: 'text',
              widget: 'string',
              default: ''
            },
            {
              label: 'URL',
              name: 'url',
              widget: 'string',
              default: ''
            }
          ]
        }
      ]
    }
  ]
};
