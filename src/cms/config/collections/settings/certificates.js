import languages from '../languageSelect';

export default {
  label: 'Дипломи та сертифікати',
  name: 'certificates',
  file: 'content/settings/certificates.md',
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'certificates_settings'
    },
    {
      label: 'Контент',
      name: 'content',
      widget: 'list',
      fields: [
        languages,
        {
          name: 'pageUrl',
          widget: 'string',
          label: 'Показувати на сторінці',
          default: '/about-me'
        },
        {
          name: 'title',
          widget: 'string',
          label: 'Заголовок',
          required: false
        },
        {
          label: 'Текст на початку',
          name: 'text_before',
          widget: 'markdown'
        },
        {
          label: 'Освіта',
          name: 'text_certificates',
          widget: 'markdown'
        },
        {
          label: 'Сертифікати',
          name: 'certificates',
          widget: 'list',
          fields: [
            {
              label: 'Зображення',
              name: 'image',
              widget: 'image'
            },
            {
              label: 'Опис',
              name: 'text',
              widget: 'string',
              required: false
            }
          ]
        },
        {
          label: 'Текст в кінці',
          name: 'text_after',
          widget: 'markdown',
          required: false
        }
      ]
    }
  ]
};
