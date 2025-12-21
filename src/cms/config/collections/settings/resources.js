import languages from '../languageSelect';

export default {
  label: 'Ресурси',
  name: 'resources',
  file: 'content/settings/resources_settings.md',
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'resources_settings'
    },
    {
      label: 'Ресурсів на сторінку',
      name: 'perPage',
      widget: 'number'
    },
    {
      label: 'Контент',
      name: 'content',
      widget: 'list',
      fields: [
        languages,
        {
          label: 'Page Title',
          name: 'title',
          widget: 'string'
        },
        {
          label: 'Sub Title',
          name: 'subtitle',
          widget: 'markdown',
          required: false
        },
        {
          label: 'Meta Description',
          name: 'metaDescription',
          widget: 'string'
        }
      ]
    }
  ]
};
