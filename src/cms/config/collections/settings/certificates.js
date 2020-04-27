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
      name: 'pageUrl',
      widget: 'string',
      label: 'Показувати на сторінці',
      default: '/about-me'
    },
    {
      name: 'title',
      widget: 'string',
      label: 'Заголовок'
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
          widget: 'string'
        }
      ]
    }
  ]
};
