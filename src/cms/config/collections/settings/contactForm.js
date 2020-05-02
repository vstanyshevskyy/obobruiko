import languages from '../languageSelect';

export default {
  label: 'Контактна форма',
  name: 'contactForm',
  file: 'content/settings/contactForm.md',
  fields: [
    {
      name: 'contentType',
      widget: 'hidden',
      default: 'contact_form_settings'
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
          default: '',
          required: false
        },
        {
          label: 'Адреса',
          name: 'address',
          widget: 'string',
          default: '',
          required: false
        },
        {
          label: 'Email',
          name: 'email',
          widget: 'string',
          default: '',
          required: false
        },
        {
          label: 'Текст email-посилання',
          name: 'emailText',
          widget: 'string',
          default: '',
          required: false
        },
        {
          label: 'Телефон',
          name: 'phone',
          widget: 'string',
          default: '',
          required: false
        },
        {
          label: 'Текст phone-посилання',
          name: 'phoneText',
          widget: 'string',
          default: '',
          required: false
        },
        {
          label: 'Placeholder для імені',
          name: 'nameInputPlaceholder',
          widget: 'string',
          default: '',
          required: false
        },
        {
          label: 'Placeholder для email-у',
          name: 'emailInputPlaceholder',
          widget: 'string',
          default: '',
          required: false
        },
        {
          label: 'Placeholder для заголовку',
          name: 'subjectInputPlaceholder',
          widget: 'string',
          default: '',
          required: false
        },
        {
          label: 'Placeholder для тексту',
          name: 'textInputPlaceholder',
          widget: 'string',
          default: '',
          required: false
        },
        {
          label: 'Текст кнопки',
          name: 'submitButtonText',
          widget: 'string',
          default: '',
          required: false
        },
        {
          label: 'Повідомлення про відправлення',
          name: 'thankYouMessage',
          widget: 'string',
          default: '',
          required: false
        }
      ]
    }
  ]
};
