export default {
  name: 'articles',
  label: 'Статті',
  file: 'content/homepage/articles.md',
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'homepageArticlesSettings'
    },
    {
      label: 'Заголовок',
      name: 'title',
      widget: 'string',
      required: false
    },
    {
      label: 'Підзаголовок',
      name: 'subtitle',
      widget: 'text',
      required: false
    },
    {
      label: 'Кількість статей на головній',
      name: 'articlesCount',
      widget: 'number',
      required: false
    }
  ]
};
