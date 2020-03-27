const articles = {
  name: 'articles',
  label: 'Статті',
  folder: 'content/content',
  filter: {
    field: 'contentType',
    value: 'articles'
  },
  create: true,
  fields: [
    {
      label: 'Type',
      name: 'contentType',
      widget: 'hidden',
      default: 'articles'
    },
    {
      label: 'Url',
      name: 'path',
      widget: 'string'
    },
    {
      label: 'Заголовок',
      name: 'title',
      widget: 'string'
    },
    {
      label: 'Підзаголовок',
      name: 'subtitle',
      widget: 'string'
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
      label: 'Теги',
      name: 'tags',
      widget: 'list',
      default: []
    },
    {
      label: 'Текст',
      name: 'body',
      widget: 'markdown'
    },
    {
      label: 'Час публікації',
      name: 'publishTime',
      required: false,
      widget: 'datetime'
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
