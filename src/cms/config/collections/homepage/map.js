export default {
  name: 'map',
  label: 'Карта',
  file: 'content/homepage/map.md',
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'homepageMapSettings'
    },
    {
      label: 'Скріншот',
      name: 'image',
      widget: 'image',
      required: false
    },
    {
      label: 'Фото ALT',
      name: 'imageAlt',
      widget: 'string',
      required: false
    },
    {
      label: 'Посилання',
      name: 'link',
      widget: 'string',
      required: false
    },
    {
      label: 'Title посилання',
      name: 'linkTitle',
      widget: 'string',
      required: false
    }
  ]
};
