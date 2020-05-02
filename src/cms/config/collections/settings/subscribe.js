import languages from '../languageSelect';

export default {
  label: 'Підписка на новини',
  name: 'subscribe_form_settings',
  file: 'content/settings/subscribe_form.md',
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'subscribe_form_settings'
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
          widget: 'string'
        },
        {
          label: 'email placeholder',
          name: 'email_placeholder',
          widget: 'string'
        },
        {
          label: 'Опис поля email',
          name: 'email_label',
          widget: 'string'
        },
        {
          label: 'Текст на кнопці',
          name: 'button_text',
          widget: 'string'
        },
        {
          label: 'Заголовок подяки',
          name: 'thanks_title',
          widget: 'string'
        },
        {
          label: 'Текст подяки',
          name: 'thanks_text',
          widget: 'string'
        }
      ]
    }
  ]
};
