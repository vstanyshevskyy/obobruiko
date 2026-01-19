import React from 'react';
import classNames from 'classnames';

import {
  PiFacebookLogo,
  PiTwitterLogo, PiEnvelope, PiInstagramLogo, PiYoutubeLogo, PiSkypeLogo, PiLinkedinLogo, PiGoogleLogo
} from 'react-icons/pi';
import './index.less';

export const getSocialIcon = icon => {
  switch (icon) {
  case 'Facebook':
    return <PiFacebookLogo className="social-icon social-icon--facebook" />;
  case 'Twitter':
    return <PiTwitterLogo className="social-icon social-icon--twitter" />;
  case 'Instagram':
    return <PiInstagramLogo className="social-icon social-icon--instagram" />;
  case 'Mail':
    return <PiEnvelope className="social-icon social-icon--google" />;
  case 'Youtube':
    return <PiYoutubeLogo className="social-icon social-icon--youtube" />;
  case 'Skype':
    return <PiSkypeLogo className="social-icon social-icon--skype" />;
  case 'Linkedin':
    return <PiLinkedinLogo className="social-icon social-icon--linkedin" />;
  case 'Google':
    return <PiGoogleLogo className="social-icon social-icon--google" />;
  default:
    return null;
  }
};

export default class SocialIcons extends React.Component {
  render() {
    const {
      listClassName, listItemClassName, linkClassName, icons = []
    } = this.props;
    const listClass = listClassName || 'navbar-nav col-2 justify-content-end d-none d-md-flex social-icons';
    const listItemClass = listItemClassName || 'nav-item';
    return (
      <ul className={listClass}>
        {icons.map(({ type, url }) => (
          <li key={type} className={listItemClass}>
            <a className={classNames(linkClassName || 'nav-link', `nav-link--${type.toLowerCase()}`)} target="_blank" rel="noopener noreferrer" href={url} title={type}>
              {getSocialIcon(type)}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}
