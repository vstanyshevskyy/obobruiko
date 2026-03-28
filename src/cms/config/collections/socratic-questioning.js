import languages from './languageSelect'

const socraticQuestioning = {
  label: 'Сократівське опитування',
  name: 'socratic_questioning',
  files: [
    {
      label: 'Сократівські запитання',
      name: 'socratic_questioning',
      file: 'content/resources/socratic-questioning.md',
      fields: [
        {
          name: 'contentType',
          widget: 'hidden',
          default: 'socratic_questioning',
        },
        {
          label: 'Показувати в списках',
          name: 'showInLists',
          widget: 'boolean',
          default: true,
        },
        {
          label: 'Час публікації',
          name: 'publishTime',
          widget: 'datetime',
          required: false,
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
              default: '/resources/socratic-questioning',
            },
            {
              label: 'Заголовок (H1)',
              name: 'title',
              widget: 'string',
            },
            {
              label: 'Підзаголовок',
              name: 'subtitle',
              widget: 'string',
              required: false,
            },
            {
              label: 'SEO Заголовок',
              name: 'seoTitle',
              widget: 'string',
            },
            {
              label: 'Опис',
              name: 'description',
              widget: 'markdown',
            },
            {
              label: 'Meta Description',
              name: 'metaDescription',
              widget: 'string',
            },
            {
              label: 'FB Title',
              name: 'fbTitle',
              widget: 'string',
            },
            {
              label: 'FB Description',
              name: 'fbDescription',
              widget: 'string',
            },
            {
              label: 'Фото для шерінгу',
              name: 'sharing_image',
              widget: 'image',
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
              name: 'imageAlt',
              widget: 'string',
            },
            {
              name: 'image_alt',
              widget: 'hidden',
            },
            {
              label: 'Лейбл для поля думки',
              name: 'thoughtLabel',
              widget: 'string',
            },
            {
              label: 'Питання',
              name: 'questions',
              widget: 'list',
              summary: '{{fields.question}}',
              fields: [
                {
                  label: 'Питання',
                  name: 'question',
                  widget: 'string',
                },
              ],
            },
            {
              label: 'Текст кнопки Зберегти PDF',
              name: 'saveButtonText',
              widget: 'string',
            },
            {
              label: 'Заголовок для друку',
              name: 'printTitle',
              widget: 'string',
            },
            {
              label: 'Текст кнопки консультації',
              name: 'bookConsultationButtonText',
              widget: 'string',
              required: false,
            },
            {
              label: 'Посилання кнопки консультації (Private)',
              name: 'bookConsultationButtonLinkPrivate',
              widget: 'string',
              required: false,
            },
            {
              label: 'Посилання кнопки консультації (OpenUp)',
              name: 'bookConsultationButtonLinkOpenup',
              widget: 'string',
              required: false,
            },
            {
              label: 'Показувати білий фон для навігації',
              name: 'useWhiteForNav',
              widget: 'boolean',
              default: false,
            },
          ],
        },
      ],
    },
  ],
}

export default socraticQuestioning
