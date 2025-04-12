import languages from '../languageSelect';

export default {
  label: 'Cookie Banner',
  name: 'cookieBanner',
  file: 'content/settings/cookieBanner.md',
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'cookie_banner'
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
          widget: 'string'
        },
        {
          label: 'Текст кнопки ОК',
          name: 'acceptButtonText',
          widget: 'string'
        },
        {
          label: 'Текст кнопки Decline',
          name: 'declineButtonText',
          widget: 'string'
        },
        {
          label: 'Текст посилання',
          name: 'linkText',
          widget: 'string'
        },
        {
          label: 'URL посилання',
          name: 'linkUrl',
          widget: 'string'
        }
      ]
    }
  ]
};
