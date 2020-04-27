export default {
  label: 'Загальні',
  name: 'general',
  file: 'content/settings/general.md',
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'general_settings'
    },
    {
      label: 'favicon',
      name: 'favicon',
      widget: 'image'
    },
    {
      label: 'URL сайту',
      name: 'url',
      widget: 'string'
    },
    {
      label: 'Назва організації, від імені якої постимо контент',
      name: 'organizationTitle',
      widget: 'string'
    },
    {
      label: 'Автор по замовчуванню',
      name: 'defaultAuthor',
      widget: 'string'
    },
    {
      label: 'Фото автора по замовчуванню',
      name: 'defaultAuthorImage',
      widget: 'image'
    },
    {
      label: 'Title Template',
      name: 'titleTemplate',
      widget: 'string'
    },
    {
      label: 'Title (Текст заголовку вікна браузера на головній)',
      name: 'title',
      widget: 'string'
    },
    {
      label: 'Meta Description',
      name: 'metaDescription',
      widget: 'string'
    },
    {
      label: 'Meta Keywords',
      name: 'metaKeywords',
      widget: 'string'
    },
    {
      label: 'FB Title (цей текст показуватиме ФБ при шерінгу сторінки)',
      name: 'fbTitle',
      widget: 'string'
    },
    {
      label: 'FB Description',
      name: 'fbDescription',
      widget: 'string'
    },
    {
      label: 'FB Image',
      name: 'fbImage',
      widget: 'image'
    }
  ]
};
