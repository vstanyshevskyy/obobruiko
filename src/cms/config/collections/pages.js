import languages from './languageSelect'

const pages = {
  name: 'pages',
  label: 'Сторінки',
  folder: 'content/pages',
  create: true,
  fields: [
    {
      label: 'Заголовок для адмінки',
      name: 'title',
      widget: 'string',
    },
    {
      label: 'Контент',
      name: 'content',
      widget: 'list',
      fields: [
        languages,
        {
          label: 'Заголовок',
          name: 'title',
          widget: 'string',
        },
        {
          label: 'SEO Заголовок',
          name: 'seoTitle',
          widget: 'string',
          required: false,
        },
        {
          label: 'Url',
          name: 'path',
          widget: 'string',
          hint: '/about-me',
        },
        {
          label: 'Підзаголовок',
          name: 'subtitle',
          widget: 'string',
          required: false,
        },
        {
          label: 'Фото',
          name: 'image',
          widget: 'image',
          required: false,
        },
        {
          label: 'Фото ALT',
          name: 'image_alt',
          widget: 'string',
          required: false,
        },
        {
          label: 'Показувати білий фон для навігації',
          name: 'useWhiteForNav',
          widget: 'boolean',
          default: false,
        },
        {
          label: 'Текст',
          name: 'text',
          widget: 'markdown',
        },
        {
          label: 'Meta Description',
          name: 'metaDescription',
          widget: 'string',
          required: false,
        },
        {
          label: 'FB Title',
          name: 'fbTitle',
          widget: 'string',
          required: false,
        },
        {
          label: 'FB Description',
          name: 'fbDescription',
          widget: 'string',
          required: false,
        },
        {
          label: 'Фото для шерінгу',
          name: 'sharing_image',
          widget: 'image',
          required: false,
        },
      ],
    },
  ],
}

export default pages
