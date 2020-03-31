const articles = {
  name: 'pages',
  label: 'Сторінки',
  folder: 'content/pages',
  create: true,
  fields: [
    {
      label: 'Url',
      name: 'path',
      widget: 'string',
      hint: '/about-me'
    },
    {
      label: 'Фото',
      name: 'image',
      widget: 'image',
      required: false
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
      label: 'Фото ALT',
      name: 'image_alt',
      widget: 'string',
      required: false
    },
    {
      label: 'Текст',
      name: 'body',
      widget: 'markdown'
    },
    {
      label: 'Meta Keywords',
      name: 'metaKeywords',
      widget: 'string',
      required: false
    },
    {
      label: 'Meta Description',
      name: 'metaDescription',
      widget: 'string',
      required: false
    }
  ]
};

export default articles;
