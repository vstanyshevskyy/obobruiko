import languages from './languageSelect';

const materials = {
  label: 'Матеріали та вправи',
  name: 'materials',
  files: [
    {
      label: 'Швидкий погляд на ваші цінності',
      name: 'values',
      file: 'content/materials/values.md',
      fields: [
        {
          label: 'Контент',
          name: 'content',
          widget: 'list',
          fields: [
            languages,
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
              label: 'Заголовок',
              name: 'title',
              widget: 'string'
            },
            {
              label: 'Опис',
              name: 'description',
              widget: 'markdown',
              required: false
            },
            {
              label: 'Інструкції',
              name: 'instruction',
              widget: 'markdown',
              required: false
            },
            {
              label: 'Питання',
              name: 'questions',
              widget: 'list',
              required: false,
              fields: [
                {
                  label: 'Назва',
                  name: 'name',
                  widget: 'string'
                },
                {
                  label: 'Текст',
                  name: 'text',
                  widget: 'string'
                }
              ]
            },
            {
              label: 'Фото для шерінгу',
              name: 'image',
              widget: 'image',
              required: false
            },
            {
              label: 'Показувати білий фон для навігації',
              name: 'useWhiteForNav',
              widget: 'boolean',
              default: false
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
    }
  ]
};

export default materials;
