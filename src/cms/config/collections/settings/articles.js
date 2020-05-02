import languages from '../languageSelect';

export default {
  label: 'Статті',
  name: 'articles',
  file: 'content/settings/articles.md',
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'articles_settings'
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
          label: 'Tag Page Title',
          name: 'tags_title',
          widget: 'string'
        },
        {
          label: 'Tags Meta Description',
          name: 'tags_metaDescription',
          widget: 'string'
        },
        {
          label: 'Tags Meta Keywords',
          name: 'tags_metaKeywords',
          widget: 'string'
        }
      ]
    }
  ]
};
