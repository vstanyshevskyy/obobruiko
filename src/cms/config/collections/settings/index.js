import articles from './articles';
import certificates from './certificates';
import contactFrom from './contactForm';
import footer from './footer';
import general from './general';
import nav from './nav';
import subscribe from './subscribe';
import questionnaires from './questionnaires';

const settings = {
  name: 'settings',
  label: 'Налаштування',
  files: [
    general,
    certificates,
    nav,
    footer,
    articles,
    questionnaires,
    contactFrom,
    subscribe
  ]
};

export default settings;
