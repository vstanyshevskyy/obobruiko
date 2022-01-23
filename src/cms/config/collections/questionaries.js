import languages from './languageSelect';

const questionaries = {
  name: 'questionaries',
  label: 'Опитувальники',
  folder: 'content/questionaries',
  create: true,
  fields: [
    {
      label: 'Заголовок для адмінки',
      name: 'title',
      widget: 'string'
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
          hint: '/questionaries/my-questionary',
          pattern: ['^\\/questionaries\\/[a-zA-Z0-9-]*', 'урл не валідний']
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
              label: 'Текст',
              name: 'text',
              widget: 'string'
            },
            {
              label: 'Мінімальне значення, щоб показати',
              name: 'minScore',
              widget: 'number',
              required: false
            },
            {
              label: 'Відповіді',
              name: 'answers',
              widget: 'list',
              fields: [
                {
                  label: 'Текст',
                  name: 'text',
                  widget: 'string'
                },
                {
                  label: 'Значення',
                  name: 'value',
                  widget: 'number',
                  required: false,
                  default: 0
                }
              ]
            }
          ]
        },
        {
          label: 'Результати',
          name: 'results',
          widget: 'list',
          fields: [
            {
              label: 'Текст',
              name: 'text',
              widget: 'string'
            },
            {
              label: 'Мінімальний результат',
              name: 'minScore',
              widget: 'number'
            },
            {
              label: 'Максимальний результат',
              name: 'maxScore',
              widget: 'number'
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
};

export default questionaries;
