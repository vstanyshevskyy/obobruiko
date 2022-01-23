import languages from '../languageSelect';

export default {
  label: 'Опитувальники',
  name: 'questionnaires_settings',
  file: 'content/settings/questionnaires_settings.md',
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'questionnaires_settings'
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
          label: 'Результат',
          name: 'resultTemplate',
          widget: 'string',
          default: '{0} балів'
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
        },
        {
          label: 'Meta Keywords',
          name: 'metaKeywords',
          widget: 'string'
        }
      ]
    }
  ]
};
