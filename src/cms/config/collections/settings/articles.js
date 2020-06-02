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
      label: 'Статей на сторінку',
      name: 'articlesPerPage',
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
          widget: 'markdown'
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
