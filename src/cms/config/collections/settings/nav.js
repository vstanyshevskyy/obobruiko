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
};
