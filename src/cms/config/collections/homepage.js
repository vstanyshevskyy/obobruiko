const homepage = {
  name: 'homepage',
  label: 'Головна',
  files: [{
    name: 'hero',
    label: 'Hero',
    file: 'content/homepage/hero.md',
    fields: [
      {
        label: 'Текст',
        name: 'text',
        widget: 'markdown',
        required: false
      },
      {
        label: 'Текст Кнопки',
        name: 'buttonText',
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
        name: 'imageAlt',
        widget: 'string',
        required: false
      }
    ]
  }]
};

export default homepage;
