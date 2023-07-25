import hero from './hero';
import quote from './quote';
import aboutMe from './about-me';
import map from './map';
import howTo from './howTo';
import services from './services';
import faq from './faq';
import articles from './articles';
import reviews from './reviews';

const homepage = {
  name: 'homepage',
  label: 'Головна',
  files: [
    hero,
    quote,
    aboutMe,
    howTo,
    services,
    faq,
    articles,
    map,
    reviews
  ]
};

export default homepage;
