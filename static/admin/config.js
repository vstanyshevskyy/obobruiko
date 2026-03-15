const config = {
  "load_config_file": false,
  "backend": {
    "name": "github",
    "repo": "vstanyshevskyy/obobruiko",
    "branch": "main"
  },
  "media_folder": "static/assets/uploads",
  "public_folder": "/assets/uploads",
  "collections": [
    {
      "name": "pages",
      "label": "Сторінки",
      "folder": "content/pages",
      "create": true,
      "fields": [
        {
          "label": "Заголовок для адмінки",
          "name": "title",
          "widget": "string"
        },
        {
          "label": "Контент",
          "name": "content",
          "widget": "list",
          "fields": [
            {
              "label": "Language",
              "name": "language",
              "widget": "select",
              "options": [
                {
                  "label": "🇺🇦 UK",
                  "value": "UK"
                },
                {
                  "label": "🇷🇺 RU",
                  "value": "RU"
                },
                {
                  "label": "🇺🇸 EN",
                  "value": "EN"
                }
              ]
            },
            {
              "label": "Заголовок",
              "name": "title",
              "widget": "string"
            },
            {
              "label": "Url",
              "name": "path",
              "widget": "string",
              "hint": "/about-me"
            },
            {
              "label": "Підзаголовок",
              "name": "subtitle",
              "widget": "string",
              "required": false
            },
            {
              "label": "Фото",
              "name": "image",
              "widget": "image",
              "required": false
            },
            {
              "label": "Фото ALT",
              "name": "image_alt",
              "widget": "string",
              "required": false
            },
            {
              "label": "Показувати білий фон для навігації",
              "name": "useWhiteForNav",
              "widget": "boolean",
              "default": false
            },
            {
              "label": "Текст",
              "name": "text",
              "widget": "markdown"
            },
            {
              "label": "Meta Description",
              "name": "metaDescription",
              "widget": "string",
              "required": false
            }
          ]
        }
      ]
    },
    {
      "name": "articles",
      "label": "Статті",
      "folder": "content/articles_files",
      "create": true,
      "fields": [
        {
          "label": "Заголовок для адмінки",
          "name": "title",
          "widget": "string"
        },
        {
          "label": "Час публікації",
          "name": "publishTime",
          "required": false,
          "widget": "datetime"
        },
        {
          "label": "Контент",
          "name": "content",
          "widget": "list",
          "fields": [
            {
              "label": "Language",
              "name": "language",
              "widget": "select",
              "options": [
                {
                  "label": "🇺🇦 UK",
                  "value": "UK"
                },
                {
                  "label": "🇷🇺 RU",
                  "value": "RU"
                },
                {
                  "label": "🇺🇸 EN",
                  "value": "EN"
                }
              ]
            },
            {
              "label": "Url",
              "name": "path",
              "widget": "string",
              "hint": "/articles/my-article",
              "pattern": [
                "^\\/articles\\/[a-zA-Z0-9-]*",
                "урл не валідний"
              ]
            },
            {
              "label": "Заголовок",
              "name": "title",
              "widget": "string"
            },
            {
              "label": "Підзаголовок",
              "name": "subtitle",
              "widget": "string",
              "required": false
            },
            {
              "label": "Фото",
              "name": "image",
              "widget": "image",
              "required": false
            },
            {
              "label": "Фото ALT",
              "name": "image_alt",
              "widget": "string",
              "required": false
            },
            {
              "label": "Фото title",
              "name": "image_title",
              "widget": "string",
              "required": false
            },
            {
              "label": "Показувати білий фон для навігації",
              "name": "useWhiteForNav",
              "widget": "boolean",
              "default": false
            },
            {
              "label": "Текст",
              "name": "text",
              "widget": "markdown"
            },
            {
              "label": "Meta Description",
              "name": "metaDescription",
              "widget": "string",
              "required": false
            },
            {
              "label": "FB Description",
              "name": "fbDescription",
              "widget": "string",
              "required": false
            }
          ]
        }
      ]
    },
    {
      "name": "questionnaires",
      "label": "Опитувальники",
      "folder": "content/questionnaires",
      "create": true,
      "fields": [
        {
          "label": "Заголовок для адмінки",
          "name": "title",
          "widget": "string"
        },
        {
          "label": "Показувати в списках",
          "name": "showInLists",
          "widget": "boolean",
          "default": true
        },
        {
          "label": "Контент",
          "name": "content",
          "widget": "list",
          "fields": [
            {
              "label": "Language",
              "name": "language",
              "widget": "select",
              "options": [
                {
                  "label": "🇺🇦 UK",
                  "value": "UK"
                },
                {
                  "label": "🇷🇺 RU",
                  "value": "RU"
                },
                {
                  "label": "🇺🇸 EN",
                  "value": "EN"
                }
              ]
            },
            {
              "label": "Url",
              "name": "path",
              "widget": "string",
              "hint": "/questionnaires/my-questionary",
              "pattern": [
                "^\\/questionnaires\\/[a-zA-Z0-9-]*",
                "урл не валідний"
              ]
            },
            {
              "label": "Фото",
              "name": "image",
              "widget": "image",
              "required": false
            },
            {
              "label": "Фото ALT",
              "name": "image_alt",
              "widget": "string",
              "required": false
            },
            {
              "label": "Заголовок на сторінці (H1)",
              "name": "title",
              "widget": "string"
            },
            {
              "label": "Заголовок вкладки (pagetitle для пошуковиків)",
              "name": "pageTitle",
              "widget": "string"
            },
            {
              "label": "Опис",
              "name": "description",
              "widget": "markdown",
              "required": false
            },
            {
              "label": "Інструкції",
              "name": "instruction",
              "widget": "markdown",
              "required": false
            },
            {
              "label": "Текст після інструкції",
              "name": "contentAfterInstructions",
              "widget": "markdown",
              "required": false
            },
            {
              "label": "Питання",
              "name": "questions",
              "widget": "list",
              "summary": "{{fields.text}}",
              "required": false,
              "fields": [
                {
                  "label": "Текст",
                  "name": "text",
                  "widget": "string"
                },
                {
                  "label": "Шкала",
                  "name": "subscale",
                  "widget": "string",
                  "default": "default"
                },
                {
                  "label": "Мінімальне значення, щоб показати",
                  "name": "minScore",
                  "widget": "number",
                  "required": false
                },
                {
                  "label": "Відповіді",
                  "name": "answers",
                  "widget": "list",
                  "summary": "{{fields.value}} - {{fields.text}}",
                  "fields": [
                    {
                      "label": "Текст",
                      "name": "text",
                      "widget": "string"
                    },
                    {
                      "label": "Значення",
                      "name": "value",
                      "widget": "number",
                      "required": false,
                      "default": 0
                    }
                  ]
                }
              ]
            },
            {
              "label": "Результати",
              "name": "results",
              "widget": "list",
              "fields": [
                {
                  "label": "Короткий опис результату",
                  "name": "resultSummary",
                  "widget": "string",
                  "hint": "Наприклад: \"Мінімальна тривога (0–4 бали)\" або \"Minimal Anxiety (0–4)\""
                },
                {
                  "label": "Текст",
                  "name": "text",
                  "widget": "markdown"
                },
                {
                  "label": "Мінімальний результат",
                  "name": "minScore",
                  "widget": "number"
                },
                {
                  "label": "Максимальний результат",
                  "name": "maxScore",
                  "widget": "number"
                },
                {
                  "label": "Колір лінії результату",
                  "name": "color",
                  "widget": "string",
                  "required": false
                }
              ]
            },
            {
              "label": "Темплейт результатів",
              "name": "resultTemplate",
              "widget": "markdown"
            },
            {
              "label": "Текст кнопки забронювати консультацію",
              "name": "bookConsultationButtonText",
              "widget": "string",
              "required": false
            },
            {
              "label": "Посилання кнопки забронювати консультацію",
              "name": "bookConsultationButtonLink",
              "widget": "string",
              "required": false
            },
            {
              "label": "Темплейт Скопіювати результати",
              "name": "copyResultsTemplate",
              "widget": "text",
              "hint": "{0} - дата, {1} - кількість балів, {2} - опис результату, {3} - кожна відповідь"
            },
            {
              "label": "Текст після результатів",
              "name": "contentAfterResults",
              "widget": "markdown",
              "required": false
            },
            {
              "label": "Заголовок рекомендованого контенту",
              "name": "recommendedContentTitle",
              "widget": "string",
              "required": false
            },
            {
              "label": "Опис рекомендованого контенту",
              "name": "recommendedContentDescription",
              "widget": "markdown",
              "required": false
            },
            {
              "label": "Рекомендований контент",
              "name": "recommendedContent",
              "widget": "list",
              "required": false,
              "summary": "{{fields.path}}",
              "fields": [
                {
                  "label": "Path",
                  "name": "path",
                  "widget": "string",
                  "hint": "/articles/example-article"
                }
              ]
            },
            {
              "label": "Текст після рекомендованого контенту",
              "name": "contentAfterRecommendedContent",
              "widget": "markdown",
              "required": false
            },
            {
              "label": "Фото для шерінгу",
              "name": "sharing_image",
              "widget": "image",
              "required": false
            },
            {
              "label": "Показувати білий фон для навігації",
              "name": "useWhiteForNav",
              "widget": "boolean",
              "default": false
            },
            {
              "label": "Час публікації",
              "name": "publishTime",
              "required": false,
              "widget": "datetime"
            },
            {
              "label": "Meta Description",
              "name": "metaDescription",
              "widget": "string",
              "required": false
            },
            {
              "label": "FB Description",
              "name": "fbDescription",
              "widget": "string",
              "required": false
            }
          ]
        }
      ]
    },
    {
      "name": "settings",
      "label": "Налаштування",
      "files": [
        {
          "label": "Загальні",
          "name": "general",
          "file": "content/settings/general.md",
          "fields": [
            {
              "name": "contentType",
              "widget": "hidden",
              "default": "general_settings"
            },
            {
              "label": "Контент",
              "name": "content",
              "widget": "list",
              "fields": [
                {
                  "label": "Language",
                  "name": "language",
                  "widget": "select",
                  "options": [
                    {
                      "label": "🇺🇦 UK",
                      "value": "UK"
                    },
                    {
                      "label": "🇷🇺 RU",
                      "value": "RU"
                    },
                    {
                      "label": "🇺🇸 EN",
                      "value": "EN"
                    }
                  ]
                },
                {
                  "label": "favicon",
                  "name": "favicon",
                  "widget": "image"
                },
                {
                  "label": "URL сайту",
                  "name": "url",
                  "widget": "string"
                },
                {
                  "label": "Назва організації, від імені якої постимо контент",
                  "name": "organizationTitle",
                  "widget": "string"
                },
                {
                  "label": "Автор по замовчуванню",
                  "name": "defaultAuthor",
                  "widget": "string"
                },
                {
                  "label": "Фото автора по замовчуванню",
                  "name": "defaultAuthorImage",
                  "widget": "image"
                },
                {
                  "label": "Title Template",
                  "name": "titleTemplate",
                  "widget": "string"
                },
                {
                  "label": "Title (Текст заголовку вікна браузера на головній)",
                  "name": "title",
                  "widget": "string"
                },
                {
                  "label": "Meta Description",
                  "name": "metaDescription",
                  "widget": "string"
                },
                {
                  "label": "FB Title (цей текст показуватиме ФБ при шерінгу сторінки)",
                  "name": "fbTitle",
                  "widget": "string"
                },
                {
                  "label": "FB Description",
                  "name": "fbDescription",
                  "widget": "string"
                },
                {
                  "label": "FB Image",
                  "name": "fbImage",
                  "widget": "image"
                }
              ]
            }
          ]
        },
        {
          "label": "Дипломи та сертифікати",
          "name": "certificates",
          "file": "content/settings/certificates.md",
          "fields": [
            {
              "name": "contentType",
              "widget": "hidden",
              "default": "certificates_settings"
            },
            {
              "label": "Контент",
              "name": "content",
              "widget": "list",
              "fields": [
                {
                  "label": "Language",
                  "name": "language",
                  "widget": "select",
                  "options": [
                    {
                      "label": "🇺🇦 UK",
                      "value": "UK"
                    },
                    {
                      "label": "🇷🇺 RU",
                      "value": "RU"
                    },
                    {
                      "label": "🇺🇸 EN",
                      "value": "EN"
                    }
                  ]
                },
                {
                  "name": "pageUrl",
                  "widget": "string",
                  "label": "Показувати на сторінці",
                  "default": "/about-me"
                },
                {
                  "name": "title",
                  "widget": "string",
                  "label": "Заголовок",
                  "required": false
                },
                {
                  "label": "Текст на початку",
                  "name": "textBefore",
                  "widget": "markdown"
                },
                {
                  "label": "Освіта",
                  "name": "textCertificates",
                  "widget": "markdown"
                },
                {
                  "label": "Сертифікати",
                  "name": "certificates",
                  "widget": "list",
                  "fields": [
                    {
                      "label": "Зображення",
                      "name": "image",
                      "widget": "image"
                    },
                    {
                      "label": "Опис",
                      "name": "text",
                      "widget": "string",
                      "required": false
                    }
                  ]
                },
                {
                  "label": "Текст в кінці",
                  "name": "textAfter",
                  "widget": "markdown",
                  "required": false
                }
              ]
            }
          ]
        },
        {
          "label": "Навігація",
          "name": "navbar",
          "file": "content/settings/navbar.md",
          "fields": [
            {
              "name": "contentType",
              "widget": "hidden",
              "default": "navbar_settings"
            },
            {
              "label": "Контент",
              "name": "content",
              "widget": "list",
              "fields": [
                {
                  "label": "Language",
                  "name": "language",
                  "widget": "select",
                  "options": [
                    {
                      "label": "🇺🇦 UK",
                      "value": "UK"
                    },
                    {
                      "label": "🇷🇺 RU",
                      "value": "RU"
                    },
                    {
                      "label": "🇺🇸 EN",
                      "value": "EN"
                    }
                  ]
                },
                {
                  "name": "logoText",
                  "label": "Лого текст",
                  "widget": "string"
                },
                {
                  "name": "slogan",
                  "label": "Слоган",
                  "widget": "string"
                },
                {
                  "name": "ctaText",
                  "label": "Текст на кнопці",
                  "widget": "string"
                },
                {
                  "name": "ctaLink",
                  "label": "Посилання кнопки",
                  "widget": "string"
                },
                {
                  "label": "Меню",
                  "name": "links",
                  "widget": "list",
                  "fields": [
                    {
                      "label": "Текст",
                      "name": "text",
                      "widget": "string"
                    },
                    {
                      "label": "Посилання",
                      "name": "url",
                      "widget": "string"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "label": "Футер",
          "name": "footer",
          "file": "content/settings/footer.md",
          "fields": [
            {
              "name": "contentType",
              "widget": "hidden",
              "default": "footer_settings"
            },
            {
              "label": "Контент",
              "name": "content",
              "widget": "list",
              "fields": [
                {
                  "label": "Language",
                  "name": "language",
                  "widget": "select",
                  "options": [
                    {
                      "label": "🇺🇦 UK",
                      "value": "UK"
                    },
                    {
                      "label": "🇷🇺 RU",
                      "value": "RU"
                    },
                    {
                      "label": "🇺🇸 EN",
                      "value": "EN"
                    }
                  ]
                },
                {
                  "label": "Копірайт",
                  "name": "copyrightText",
                  "widget": "markdown"
                },
                {
                  "label": "Посилання в самом у низу",
                  "name": "bottomLinks",
                  "widget": "list",
                  "fields": [
                    {
                      "label": "Текст",
                      "name": "text",
                      "widget": "string",
                      "default": ""
                    },
                    {
                      "label": "URL",
                      "name": "url",
                      "widget": "string",
                      "default": ""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "label": "Статті",
          "name": "articles",
          "file": "content/settings/articles_settings.md",
          "fields": [
            {
              "name": "contentType",
              "widget": "hidden",
              "default": "articles_settings"
            },
            {
              "label": "Статей на сторінку",
              "name": "articlesPerPage",
              "widget": "number"
            },
            {
              "label": "Контент",
              "name": "content",
              "widget": "list",
              "fields": [
                {
                  "label": "Language",
                  "name": "language",
                  "widget": "select",
                  "options": [
                    {
                      "label": "🇺🇦 UK",
                      "value": "UK"
                    },
                    {
                      "label": "🇷🇺 RU",
                      "value": "RU"
                    },
                    {
                      "label": "🇺🇸 EN",
                      "value": "EN"
                    }
                  ]
                },
                {
                  "label": "Page Title",
                  "name": "title",
                  "widget": "string"
                },
                {
                  "label": "Sub Title",
                  "name": "subtitle",
                  "widget": "markdown",
                  "required": false
                },
                {
                  "label": "Meta Description",
                  "name": "metaDescription",
                  "widget": "string"
                }
              ]
            }
          ]
        },
        {
          "label": "Контактна форма",
          "name": "contactForm",
          "file": "content/settings/contactForm.md",
          "fields": [
            {
              "name": "contentType",
              "widget": "hidden",
              "default": "contact_form_settings"
            },
            {
              "label": "Контент",
              "name": "content",
              "widget": "list",
              "fields": [
                {
                  "label": "Language",
                  "name": "language",
                  "widget": "select",
                  "options": [
                    {
                      "label": "🇺🇦 UK",
                      "value": "UK"
                    },
                    {
                      "label": "🇷🇺 RU",
                      "value": "RU"
                    },
                    {
                      "label": "🇺🇸 EN",
                      "value": "EN"
                    }
                  ]
                },
                {
                  "label": "Заголовок",
                  "name": "title",
                  "widget": "string",
                  "default": "",
                  "required": false
                },
                {
                  "label": "Адреса",
                  "name": "address",
                  "widget": "string",
                  "default": "",
                  "required": false
                },
                {
                  "label": "Email",
                  "name": "email",
                  "widget": "string",
                  "default": "",
                  "required": false
                },
                {
                  "label": "Текст email-посилання",
                  "name": "emailText",
                  "widget": "string",
                  "default": "",
                  "required": false
                },
                {
                  "label": "Телефон",
                  "name": "phone",
                  "widget": "string",
                  "default": "",
                  "required": false
                },
                {
                  "label": "Текст phone-посилання",
                  "name": "phoneText",
                  "widget": "string",
                  "default": "",
                  "required": false
                },
                {
                  "label": "Заголовок для форми",
                  "name": "contactFormTitle",
                  "widget": "string",
                  "default": "",
                  "required": false
                },
                {
                  "label": "Placeholder для імені",
                  "name": "nameInputPlaceholder",
                  "widget": "string",
                  "default": "",
                  "required": false
                },
                {
                  "label": "Placeholder для email-у",
                  "name": "emailInputPlaceholder",
                  "widget": "string",
                  "default": "",
                  "required": false
                },
                {
                  "label": "Placeholder для заголовку",
                  "name": "subjectInputPlaceholder",
                  "widget": "string",
                  "default": "",
                  "required": false
                },
                {
                  "label": "Placeholder для тексту",
                  "name": "textInputPlaceholder",
                  "widget": "string",
                  "default": "",
                  "required": false
                },
                {
                  "label": "Текст кнопки",
                  "name": "submitButtonText",
                  "widget": "string",
                  "default": "",
                  "required": false
                },
                {
                  "label": "Повідомлення про відправлення",
                  "name": "thankYouMessage",
                  "widget": "string",
                  "default": "",
                  "required": false
                }
              ]
            }
          ]
        },
        {
          "label": "Підписка на новини",
          "name": "subscribe_form_settings",
          "file": "content/settings/subscribe_form.md",
          "fields": [
            {
              "name": "contentType",
              "widget": "hidden",
              "default": "subscribe_form_settings"
            },
            {
              "label": "Контент",
              "name": "content",
              "widget": "list",
              "fields": [
                {
                  "label": "Language",
                  "name": "language",
                  "widget": "select",
                  "options": [
                    {
                      "label": "🇺🇦 UK",
                      "value": "UK"
                    },
                    {
                      "label": "🇷🇺 RU",
                      "value": "RU"
                    },
                    {
                      "label": "🇺🇸 EN",
                      "value": "EN"
                    }
                  ]
                },
                {
                  "label": "Заголовок",
                  "name": "title",
                  "widget": "string"
                },
                {
                  "label": "email placeholder",
                  "name": "emailPlaceholder",
                  "widget": "string"
                },
                {
                  "label": "Опис поля email",
                  "name": "emailLabel",
                  "widget": "string"
                },
                {
                  "label": "Текст на кнопці",
                  "name": "buttonText",
                  "widget": "string"
                },
                {
                  "label": "Заголовок подяки",
                  "name": "thanksTitle",
                  "widget": "string"
                },
                {
                  "label": "Текст подяки",
                  "name": "thanksText",
                  "widget": "string"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "homepage",
      "label": "Головна",
      "files": [
        {
          "name": "hero",
          "label": "Hero",
          "file": "content/homepage/hero.md",
          "fields": [
            {
              "name": "contentType",
              "widget": "hidden",
              "default": "homepageHeroSettings"
            },
            {
              "label": "Контент",
              "name": "content",
              "widget": "list",
              "fields": [
                {
                  "label": "Language",
                  "name": "language",
                  "widget": "select",
                  "options": [
                    {
                      "label": "🇺🇦 UK",
                      "value": "UK"
                    },
                    {
                      "label": "🇷🇺 RU",
                      "value": "RU"
                    },
                    {
                      "label": "🇺🇸 EN",
                      "value": "EN"
                    }
                  ]
                },
                {
                  "label": "Текст",
                  "name": "text",
                  "widget": "markdown",
                  "required": false
                },
                {
                  "label": "Підзаголовок",
                  "name": "subtitle",
                  "widget": "markdown",
                  "required": false
                },
                {
                  "label": "Текст Кнопки",
                  "name": "buttonText",
                  "widget": "string",
                  "required": false
                },
                {
                  "label": "Посилання кнопки",
                  "name": "buttonHref",
                  "widget": "string",
                  "required": false
                },
                {
                  "label": "Фото",
                  "name": "image",
                  "widget": "image",
                  "required": false
                },
                {
                  "label": "Фото ALT",
                  "name": "imageAlt",
                  "widget": "string",
                  "required": false
                }
              ]
            }
          ]
        },
        {
          "name": "quote",
          "label": "Цитата",
          "file": "content/homepage/quote.md",
          "fields": [
            {
              "name": "contentType",
              "widget": "hidden",
              "default": "homepageQuoteSettings"
            },
            {
              "label": "Контент",
              "name": "content",
              "widget": "list",
              "fields": [
                {
                  "label": "Language",
                  "name": "language",
                  "widget": "select",
                  "options": [
                    {
                      "label": "🇺🇦 UK",
                      "value": "UK"
                    },
                    {
                      "label": "🇷🇺 RU",
                      "value": "RU"
                    },
                    {
                      "label": "🇺🇸 EN",
                      "value": "EN"
                    }
                  ]
                },
                {
                  "label": "Текст",
                  "name": "text",
                  "widget": "markdown",
                  "required": false
                },
                {
                  "label": "Автор",
                  "name": "author",
                  "widget": "string",
                  "required": false
                }
              ]
            }
          ]
        },
        {
          "name": "aboutMe",
          "label": "Про мене",
          "file": "content/homepage/about-me.md",
          "fields": [
            {
              "name": "contentType",
              "widget": "hidden",
              "default": "homepageAboutMeSettings"
            },
            {
              "label": "Контент",
              "name": "content",
              "widget": "list",
              "fields": [
                {
                  "label": "Language",
                  "name": "language",
                  "widget": "select",
                  "options": [
                    {
                      "label": "🇺🇦 UK",
                      "value": "UK"
                    },
                    {
                      "label": "🇷🇺 RU",
                      "value": "RU"
                    },
                    {
                      "label": "🇺🇸 EN",
                      "value": "EN"
                    }
                  ]
                },
                {
                  "label": "Заголовок",
                  "name": "title",
                  "widget": "string",
                  "required": false
                },
                {
                  "label": "Фото",
                  "name": "image",
                  "widget": "image",
                  "required": false
                },
                {
                  "label": "Фото ALT",
                  "name": "imageAlt",
                  "widget": "string",
                  "required": false
                },
                {
                  "label": "Текст кнопки",
                  "name": "ctaText",
                  "widget": "string",
                  "required": false
                },
                {
                  "label": "Посилання кнопки",
                  "name": "ctaHref",
                  "widget": "string",
                  "required": false
                },
                {
                  "label": "Текст",
                  "name": "text",
                  "widget": "markdown",
                  "required": false
                }
              ]
            }
          ]
        },
        {
          "name": "howTo",
          "label": "Як прийти на консультацію",
          "file": "content/homepage/howTo.md",
          "fields": [
            {
              "name": "contentType",
              "widget": "hidden",
              "default": "homepageHowToSettings"
            },
            {
              "label": "Контент",
              "name": "content",
              "widget": "list",
              "fields": [
                {
                  "label": "Language",
                  "name": "language",
                  "widget": "select",
                  "options": [
                    {
                      "label": "🇺🇦 UK",
                      "value": "UK"
                    },
                    {
                      "label": "🇷🇺 RU",
                      "value": "RU"
                    },
                    {
                      "label": "🇺🇸 EN",
                      "value": "EN"
                    }
                  ]
                },
                {
                  "label": "Показувати на головній",
                  "name": "isEnabled",
                  "widget": "boolean",
                  "default": false
                },
                {
                  "label": "Заголовок",
                  "name": "title",
                  "widget": "string",
                  "required": false
                },
                {
                  "label": "Кроки",
                  "name": "steps",
                  "widget": "list",
                  "fields": [
                    {
                      "label": "Заголовок",
                      "name": "title",
                      "widget": "string",
                      "default": ""
                    },
                    {
                      "label": "Текст",
                      "name": "text",
                      "widget": "text",
                      "default": ""
                    },
                    {
                      "label": "Іконка",
                      "name": "icon",
                      "widget": "image",
                      "default": ""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "name": "services",
          "label": "Послуги",
          "file": "content/homepage/services.md",
          "fields": [
            {
              "name": "contentType",
              "widget": "hidden",
              "default": "homepageServices"
            },
            {
              "label": "Контент",
              "name": "content",
              "widget": "list",
              "fields": [
                {
                  "label": "Language",
                  "name": "language",
                  "widget": "select",
                  "options": [
                    {
                      "label": "🇺🇦 UK",
                      "value": "UK"
                    },
                    {
                      "label": "🇷🇺 RU",
                      "value": "RU"
                    },
                    {
                      "label": "🇺🇸 EN",
                      "value": "EN"
                    }
                  ]
                },
                {
                  "label": "Заголовок",
                  "name": "title",
                  "widget": "string",
                  "required": false
                },
                {
                  "label": "Підзаголовок",
                  "name": "subtitle",
                  "widget": "text",
                  "required": false
                },
                {
                  "label": "Послуги",
                  "name": "services",
                  "widget": "list",
                  "fields": [
                    {
                      "label": "Заголовок",
                      "name": "title",
                      "widget": "string",
                      "default": ""
                    },
                    {
                      "label": "Зображення",
                      "name": "image",
                      "widget": "image",
                      "default": ""
                    },
                    {
                      "label": "Текст",
                      "name": "text",
                      "widget": "markdown",
                      "default": ""
                    },
                    {
                      "label": "Текст посилання",
                      "name": "linkText",
                      "widget": "string",
                      "default": "",
                      "required": false
                    },
                    {
                      "label": "Посилання",
                      "name": "link",
                      "widget": "string",
                      "default": "",
                      "required": false
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "name": "faq",
          "label": "FAQ",
          "file": "content/homepage/faq.md",
          "fields": [
            {
              "name": "contentType",
              "widget": "hidden",
              "default": "homepageFaq"
            },
            {
              "label": "Контент",
              "name": "content",
              "widget": "list",
              "fields": [
                {
                  "label": "Language",
                  "name": "language",
                  "widget": "select",
                  "options": [
                    {
                      "label": "🇺🇦 UK",
                      "value": "UK"
                    },
                    {
                      "label": "🇷🇺 RU",
                      "value": "RU"
                    },
                    {
                      "label": "🇺🇸 EN",
                      "value": "EN"
                    }
                  ]
                },
                {
                  "label": "Показувати на головній",
                  "name": "isEnabled",
                  "widget": "boolean",
                  "default": false
                },
                {
                  "label": "Заголовок",
                  "name": "title",
                  "widget": "string",
                  "required": false
                },
                {
                  "label": "Підзаголовок",
                  "name": "subtitle",
                  "widget": "text",
                  "required": false
                },
                {
                  "label": "FAQ",
                  "name": "faq",
                  "widget": "list",
                  "fields": [
                    {
                      "label": "Питання",
                      "name": "question",
                      "widget": "string",
                      "default": ""
                    },
                    {
                      "label": "Відповідь",
                      "name": "answer",
                      "widget": "text",
                      "default": ""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "name": "articles",
          "label": "Статті",
          "file": "content/homepage/articles.md",
          "fields": [
            {
              "name": "contentType",
              "widget": "hidden",
              "default": "homepageArticlesSettings"
            },
            {
              "label": "Контент",
              "name": "content",
              "widget": "list",
              "fields": [
                {
                  "label": "Language",
                  "name": "language",
                  "widget": "select",
                  "options": [
                    {
                      "label": "🇺🇦 UK",
                      "value": "UK"
                    },
                    {
                      "label": "🇷🇺 RU",
                      "value": "RU"
                    },
                    {
                      "label": "🇺🇸 EN",
                      "value": "EN"
                    }
                  ]
                },
                {
                  "label": "Заголовок",
                  "name": "title",
                  "widget": "string",
                  "required": false
                },
                {
                  "label": "Підзаголовок",
                  "name": "subtitle",
                  "widget": "markdown",
                  "required": false
                },
                {
                  "label": "Кількість статей на головній",
                  "name": "articlesCount",
                  "widget": "number",
                  "required": false
                }
              ]
            }
          ]
        },
        {
          "name": "map",
          "label": "Карта",
          "file": "content/homepage/map.md",
          "fields": [
            {
              "name": "contentType",
              "widget": "hidden",
              "default": "homepageMapSettings"
            },
            {
              "label": "Контент",
              "name": "content",
              "widget": "list",
              "fields": [
                {
                  "label": "Language",
                  "name": "language",
                  "widget": "select",
                  "options": [
                    {
                      "label": "🇺🇦 UK",
                      "value": "UK"
                    },
                    {
                      "label": "🇷🇺 RU",
                      "value": "RU"
                    },
                    {
                      "label": "🇺🇸 EN",
                      "value": "EN"
                    }
                  ]
                },
                {
                  "label": "Показувати на головній",
                  "name": "isEnabled",
                  "widget": "boolean",
                  "default": false
                },
                {
                  "label": "Скріншот",
                  "name": "image",
                  "widget": "image",
                  "required": false
                },
                {
                  "label": "Фото ALT",
                  "name": "imageAlt",
                  "widget": "string",
                  "required": false
                },
                {
                  "label": "Посилання",
                  "name": "link",
                  "widget": "string",
                  "required": false
                },
                {
                  "label": "Title посилання",
                  "name": "linkTitle",
                  "widget": "string",
                  "required": false
                }
              ]
            }
          ]
        },
        {
          "label": "Відгуки",
          "name": "reviews",
          "file": "content/homepage/reviews.md",
          "fields": [
            {
              "name": "contentType",
              "widget": "hidden",
              "default": "reviews"
            },
            {
              "label": "Контент",
              "name": "content",
              "widget": "list",
              "fields": [
                {
                  "label": "Language",
                  "name": "language",
                  "widget": "select",
                  "options": [
                    {
                      "label": "🇺🇦 UK",
                      "value": "UK"
                    },
                    {
                      "label": "🇷🇺 RU",
                      "value": "RU"
                    },
                    {
                      "label": "🇺🇸 EN",
                      "value": "EN"
                    }
                  ]
                },
                {
                  "label": "Показувати на сторінці",
                  "name": "isEnabled",
                  "widget": "boolean",
                  "required": false
                },
                {
                  "label": "Заголовок",
                  "name": "title",
                  "widget": "string",
                  "default": ""
                },
                {
                  "label": "Відгуки",
                  "name": "reviews",
                  "widget": "list",
                  "summary": "{{fields.author.name}} - {{fields.date}}",
                  "fields": [
                    {
                      "label": "Текст",
                      "name": "text",
                      "widget": "markdown"
                    },
                    {
                      "label": "Примітка перекладу",
                      "name": "translationNote",
                      "widget": "string",
                      "required": false
                    },
                    {
                      "label": "Автор",
                      "name": "author",
                      "widget": "object",
                      "required": false,
                      "summary": "{{fields.name}}",
                      "fields": [
                        {
                          "label": "Імя",
                          "name": "name",
                          "widget": "string",
                          "required": true
                        },
                        {
                          "label": "Фото",
                          "name": "image",
                          "widget": "image",
                          "required": true,
                          "default": "/assets/uploads/default_avatar_profile-removebg-preview.png"
                        }
                      ]
                    },
                    {
                      "label": "Джерело",
                      "name": "source",
                      "widget": "object",
                      "required": false,
                      "fields": [
                        {
                          "label": "URL",
                          "name": "url",
                          "widget": "string",
                          "required": false
                        },
                        {
                          "label": "Текст посилання",
                          "name": "text",
                          "widget": "string",
                          "required": false
                        },
                        {
                          "label": "Іконка",
                          "widget": "select",
                          "name": "socialIcon",
                          "options": [
                            "Facebook",
                            "Instagram",
                            "Linkedin",
                            "Google",
                            "Youtube"
                          ],
                          "required": false
                        }
                      ]
                    },
                    {
                      "label": "Дата",
                      "name": "date",
                      "widget": "datetime",
                      "default": "",
                      "date_format": "DD.MM.YYYY",
                      "picker_utc": true,
                      "required": false
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "label": "Цінності",
      "name": "values",
      "files": [
        {
          "label": "Швидкий погляд на ваші цінності",
          "name": "values",
          "file": "content/resources/values.md",
          "fields": [
            {
              "name": "contentType",
              "widget": "hidden",
              "default": "values"
            },
            {
              "label": "Контент",
              "name": "content",
              "widget": "list",
              "fields": [
                {
                  "label": "Language",
                  "name": "language",
                  "widget": "select",
                  "options": [
                    {
                      "label": "🇺🇦 UK",
                      "value": "UK"
                    },
                    {
                      "label": "🇷🇺 RU",
                      "value": "RU"
                    },
                    {
                      "label": "🇺🇸 EN",
                      "value": "EN"
                    }
                  ]
                },
                {
                  "name": "path",
                  "widget": "hidden",
                  "default": "/resource/values"
                },
                {
                  "label": "Фото",
                  "name": "image",
                  "widget": "image",
                  "required": false
                },
                {
                  "label": "Фото ALT",
                  "name": "image_alt",
                  "widget": "string",
                  "required": false
                },
                {
                  "label": "Заголовок",
                  "name": "title",
                  "widget": "string"
                },
                {
                  "label": "Опис",
                  "name": "description",
                  "widget": "markdown",
                  "required": false
                },
                {
                  "label": "Інструкції",
                  "name": "instruction",
                  "widget": "markdown",
                  "required": false
                },
                {
                  "label": "Питання",
                  "name": "questions",
                  "widget": "list",
                  "required": false,
                  "fields": [
                    {
                      "label": "Назва",
                      "name": "name",
                      "widget": "string"
                    },
                    {
                      "label": "Текст",
                      "name": "text",
                      "widget": "string"
                    }
                  ]
                },
                {
                  "label": "Переклад Варіанти",
                  "name": "options",
                  "widget": "object",
                  "fields": [
                    {
                      "label": "Дуже важливо",
                      "name": "very_important",
                      "widget": "string"
                    },
                    {
                      "label": "Достатньо важливо",
                      "name": "important",
                      "widget": "string"
                    },
                    {
                      "label": "Не так важливо",
                      "name": "not_important",
                      "widget": "string"
                    }
                  ]
                },
                {
                  "label": "Текст на кнопці Друк",
                  "name": "printText",
                  "widget": "string",
                  "default": "Роздрукувати"
                },
                {
                  "label": "Заголовок результати",
                  "name": "resultsHeading",
                  "widget": "string",
                  "default": "Ваші цінності"
                },
                {
                  "label": "Текст про результати",
                  "name": "resultsDescription",
                  "widget": "markdown",
                  "required": false
                },
                {
                  "label": "Фото для шерінгу",
                  "name": "sharing_image",
                  "widget": "image",
                  "required": false
                },
                {
                  "label": "Показувати білий фон для навігації",
                  "name": "useWhiteForNav",
                  "widget": "boolean",
                  "default": false
                },
                {
                  "label": "Час публікації",
                  "name": "publishTime",
                  "required": false,
                  "widget": "datetime"
                },
                {
                  "label": "Meta Description",
                  "name": "metaDescription",
                  "widget": "string",
                  "required": false
                },
                {
                  "label": "FB Description",
                  "name": "fbDescription",
                  "widget": "string",
                  "required": false
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "resources",
      "label": "Ресурси",
      "folder": "content/resources",
      "create": true,
      "fields": [
        {
          "label": "Заголовок для адмінки",
          "name": "title",
          "widget": "string"
        },
        {
          "label": "Час публікації",
          "name": "publishTime",
          "required": false,
          "widget": "datetime"
        },
        {
          "label": "Контент",
          "name": "content",
          "widget": "list",
          "fields": [
            {
              "label": "Language",
              "name": "language",
              "widget": "select",
              "options": [
                {
                  "label": "🇺🇦 UK",
                  "value": "UK"
                },
                {
                  "label": "🇷🇺 RU",
                  "value": "RU"
                },
                {
                  "label": "🇺🇸 EN",
                  "value": "EN"
                }
              ]
            },
            {
              "label": "Url",
              "name": "path",
              "widget": "string",
              "hint": "/resources/my-article",
              "pattern": [
                "^\\/resources\\/[a-zA-Z0-9-]*",
                "урл не валідний"
              ]
            },
            {
              "label": "Заголовок",
              "name": "title",
              "widget": "string"
            },
            {
              "label": "Підзаголовок",
              "name": "subtitle",
              "widget": "string",
              "required": false
            },
            {
              "label": "Фото",
              "name": "image",
              "widget": "image",
              "required": false
            },
            {
              "label": "Фото ALT",
              "name": "image_alt",
              "widget": "string",
              "required": false
            },
            {
              "label": "Фото title",
              "name": "image_title",
              "widget": "string",
              "required": false
            },
            {
              "label": "Показувати білий фон для навігації",
              "name": "useWhiteForNav",
              "widget": "boolean",
              "default": false
            },
            {
              "label": "Текст",
              "name": "text",
              "widget": "markdown"
            },
            {
              "label": "Meta Description",
              "name": "metaDescription",
              "widget": "string",
              "required": false
            },
            {
              "label": "FB Description",
              "name": "fbDescription",
              "widget": "string",
              "required": false
            }
          ]
        }
      ]
    },
    {
      "label": "Сократівське опитування",
      "name": "socratic_questioning",
      "files": [
        {
          "label": "Сократівські запитання",
          "name": "socratic_questioning",
          "file": "content/resources/socratic-questioning.md",
          "fields": [
            {
              "name": "contentType",
              "widget": "hidden",
              "default": "socratic_questioning"
            },
            {
              "label": "Показувати в списках",
              "name": "showInLists",
              "widget": "boolean",
              "default": true
            },
            {
              "label": "Час публікації",
              "name": "publishTime",
              "widget": "datetime",
              "required": false
            },
            {
              "label": "Контент",
              "name": "content",
              "widget": "list",
              "fields": [
                {
                  "label": "Language",
                  "name": "language",
                  "widget": "select",
                  "options": [
                    {
                      "label": "🇺🇦 UK",
                      "value": "UK"
                    },
                    {
                      "label": "🇷🇺 RU",
                      "value": "RU"
                    },
                    {
                      "label": "🇺🇸 EN",
                      "value": "EN"
                    }
                  ]
                },
                {
                  "name": "path",
                  "widget": "hidden",
                  "default": "/resources/socratic-questioning"
                },
                {
                  "label": "Заголовок (H1)",
                  "name": "title",
                  "widget": "string"
                },
                {
                  "label": "Підзаголовок",
                  "name": "subtitle",
                  "widget": "string",
                  "required": false
                },
                {
                  "label": "SEO Заголовок",
                  "name": "seoTitle",
                  "widget": "string"
                },
                {
                  "label": "Опис",
                  "name": "description",
                  "widget": "markdown"
                },
                {
                  "label": "Meta Description",
                  "name": "metaDescription",
                  "widget": "string"
                },
                {
                  "label": "FB Title",
                  "name": "fbTitle",
                  "widget": "string"
                },
                {
                  "label": "FB Description",
                  "name": "fbDescription",
                  "widget": "string"
                },
                {
                  "label": "Фото",
                  "name": "image",
                  "widget": "image",
                  "required": false
                },
                {
                  "label": "Фото ALT",
                  "name": "imageAlt",
                  "widget": "string"
                },
                {
                  "name": "image_alt",
                  "widget": "hidden"
                },
                {
                  "label": "Лейбл для поля думки",
                  "name": "thoughtLabel",
                  "widget": "string"
                },
                {
                  "label": "Питання",
                  "name": "questions",
                  "widget": "list",
                  "summary": "{{fields.question}}",
                  "fields": [
                    {
                      "label": "Питання",
                      "name": "question",
                      "widget": "string"
                    }
                  ]
                },
                {
                  "label": "Текст кнопки Зберегти PDF",
                  "name": "saveButtonText",
                  "widget": "string"
                },
                {
                  "label": "Заголовок для друку",
                  "name": "printTitle",
                  "widget": "string"
                },
                {
                  "label": "Текст кнопки консультації",
                  "name": "bookConsultationButtonText",
                  "widget": "string",
                  "required": false
                },
                {
                  "label": "Посилання кнопки консультації (Private)",
                  "name": "bookConsultationButtonLinkPrivate",
                  "widget": "string",
                  "required": false
                },
                {
                  "label": "Посилання кнопки консультації (OpenUp)",
                  "name": "bookConsultationButtonLinkOpenup",
                  "widget": "string",
                  "required": false
                },
                {
                  "label": "Показувати білий фон для навігації",
                  "name": "useWhiteForNav",
                  "widget": "boolean",
                  "default": false
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export default config;
