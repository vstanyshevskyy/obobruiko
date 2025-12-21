import languages from './languageSelect';

const articles = {
  name: 'articles',
  label: 'Статті',
  folder: 'content/articles_files',
  create: true,
  fields: [
    {
      label: 'Заголовок для адмінки',
      name: 'title',
      widget: 'string'
    },
    {
      label: 'Час публікації',
      name: 'publishTime',
      required: false,
      widget: 'datetime'
    },
    {
      label: 'Контент',
      name: 'content',
      widget: 'list',
      fields: [
        languages,
        {
          label: 'Url',
          name: 'path',
          widget: 'string',
          hint: '/articles/my-article',
          pattern: ['^\\/articles\\/[a-zA-Z0-9-]*', 'урл не валідний']
        },
        {
          label: 'Заголовок',
          name: 'title',
          widget: 'string'
        },
        {
          label: 'Підзаголовок',
          name: 'subtitle',
          widget: 'string',
          required: false
        },
        {
          label: 'Фото',
          name: 'image',
          widget: 'image',
          required: false
        },
        {
          label: 'Фото ALT',
          name: 'image_alt',
          widget: 'string',
          required: false
        },
        {
          label: 'Фото title',
          name: 'image_title',
          widget: 'string',
          required: false
        },
        {
          label: 'Показувати білий фон для навігації',
          name: 'useWhiteForNav',
          widget: 'boolean',
          default: false
        },
        {
          label: 'Текст',
          name: 'text',
          widget: 'markdown'
        },
        {
          label: 'Meta Description',
          name: 'metaDescription',
          widget: 'string',
          required: false
        },
        {
          label: 'FB Description',
          name: 'fbDescription',
          widget: 'string',
          required: false
        }
      ]
    }
  ]
};

export default articles;
