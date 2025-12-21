import languages from './languageSelect';

const resources = {
  label: 'Цінності',
  name: 'values',
  files: [
    {
      label: 'Швидкий погляд на ваші цінності',
      name: 'values',
      file: 'content/resources/values.md',
      fields: [
        {
          name: 'contentType',
          widget: 'hidden',
          default: 'values'
        },
        {
          label: 'Контент',
          name: 'content',
          widget: 'list',
          fields: [
            languages,
            {
              name: 'path',
              widget: 'hidden',
              default: '/resource/values'
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
              label: 'Переклад Варіанти',
              name: 'options',
              widget: 'object',
              fields: [
                { label: 'Дуже важливо', name: 'very_important', widget: 'string' },
                { label: 'Достатньо важливо', name: 'important', widget: 'string' },
                { label: 'Не так важливо', name: 'not_important', widget: 'string' }
              ]
            },
            {
              label: 'Текст на кнопці Друк',
              name: 'printText',
              widget: 'string',
              default: 'Роздрукувати'
            },
            {
              label: 'Заголовок результати',
              name: 'resultsHeading',
              widget: 'string',
              default: 'Ваші цінності'
            },
            {
              label: 'Текст про результати',
              name: 'resultsDescription',
              widget: 'markdown',
              required: false
            },
            {
              label: 'Фото для шерінгу',
              name: 'sharing_image',
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

export default resources;
