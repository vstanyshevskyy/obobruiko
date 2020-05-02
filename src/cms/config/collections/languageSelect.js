import Config from '../../../config';

const languages = {
  label: 'Language',
  name: 'language',
  widget: 'select',
  options: Config.languages.map(l => ({
    label: `${l.icon} ${l.title}`,
    value: l.title
  }))
};

export default languages;
