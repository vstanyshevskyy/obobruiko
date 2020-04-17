const settings = {
  name: 'settings',
  label: 'Налаштування',
  files: [
    {
      label: 'Загальні',
      name: 'general',
      file: 'content/settings/general.md',
      fields: [
        {
          name: 'contentType',
          widget: 'hidden',
          default: 'general_settings'
        },
        {
          label: 'favicon',
          name: 'favicon',
          widget: 'image'
        },
        {
          label: 'URL сайту',
          name: 'url',
          widget: 'string'
        },
        {
          label: 'Назва організації, від імені якої постимо контент',
          name: 'organizationTitle',
          widget: 'string'
        },
        {
          label: 'Автор по замовчуванню',
          name: 'defaultAuthor',
          widget: 'string'
        },
        {
          label: 'Фото автора по замовчуванню',
          name: 'defaultAuthorImage',
          widget: 'image'
        },
        {
          label: 'Title Template',
          name: 'titleTemplate',
          widget: 'string'
        },
        {
          label: 'Title (Текст заголовку вікна браузера на головній)',
          name: 'title',
          widget: 'string'
        },
        {
          label: 'Meta Description',
          name: 'metaDescription',
          widget: 'string'
        },
        {
          label: 'Meta Keywords',
          name: 'metaKeywords',
          widget: 'string'
        },
        {
          label: 'FB Title (цей текст показуватиме ФБ при шерінгу сторінки)',
          name: 'fbTitle',
          widget: 'string'
        },
        {
          label: 'FB Description',
          name: 'fbDescription',
          widget: 'string'
        },
        {
          label: 'FB Image',
          name: 'fbImage',
          widget: 'image'
        }
      ]
    },
    {
      label: 'Статті',
      name: 'articles',
      file: 'content/settings/articles.md',
      fields: [
        {
          name: 'contentType',
          widget: 'hidden',
          default: 'articles_settings'
        },
        {
          label: 'Page Title',
          name: 'title',
          widget: 'string'
        },
        {
          label: 'Meta Description',
          name: 'metaDescription',
          widget: 'string'
        },
        {
          label: 'Meta Keywords',
          name: 'metaKeywords',
          widget: 'string'
        },
        {
          label: 'Tag Page Title',
          name: 'tags_title',
          widget: 'string'
        },
        {
          label: 'Tags Meta Description',
          name: 'tags_metaDescription',
          widget: 'string'
        },
        {
          label: 'Tags Meta Keywords',
          name: 'tags_metaKeywords',
          widget: 'string'
        }
      ]
    },
    {
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
    },
    {
      label: 'Футер',
      name: 'footer',
      file: 'content/settings/footer.md',
      fields: [
        {
          name: 'contentType',
          widget: 'hidden',
          default: 'footer_settings'
        },
        {
          label: 'Копірайт',
          name: 'copyrightText',
          widget: 'string'
        },
        {
          label: 'Посилання в самом у низу',
          name: 'bottomLinks',
          widget: 'list',
          fields: [
            {
              label: 'Текст',
              name: 'text',
              widget: 'string',
              default: ''
            },
            {
              label: 'URL',
              name: 'url',
              widget: 'string',
              default: ''
            }
          ]
        }
      ]
    },
    {
      label: 'Навігація',
      name: 'navbar',
      file: 'content/settings/navbar.md',
      fields: [
        {
          name: 'contentType',
          widget: 'hidden',
          default: 'navbar_settings'
        },
        {
          label: 'Меню',
          name: 'links',
          widget: 'list',
          fields: [
            {
              label: 'Текст',
              name: 'text',
              widget: 'string'
            },
            {
              label: 'Посилання',
              name: 'url',
              widget: 'string'
            }
          ]
        }
      ]
    },
    {
      label: 'Дипломи та сертифікати',
      name: 'certificates',
      file: 'content/settings/certificates.md',
      fields: [
        {
          name: 'contentType',
          widget: 'hidden',
          default: 'certificates_settings'
        },
        {
          label: 'Сертифікати',
          name: 'certificates',
          widget: 'list',
          fields: [
            {
              label: 'Зображення',
              name: 'image',
              widget: 'image'
            },
            {
              label: 'Опис',
              name: 'text',
              widget: 'string'
            }
          ]
        }
      ]
    },
    {
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

export default settings;
