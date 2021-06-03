import React from 'react';
import classNames from 'classnames';

import {
  FaFacebookF, FaTwitter, FaRegEnvelope, FaInstagram, FaYoutube, FaSkype
} from 'react-icons/fa';
import './index.less';

export default class SocialIcons extends React.Component {
  getIconComponent(type) {
    switch (type) {
    case 'Facebook':
      return <FaFacebookF className="social-icon social-icon--facebook" />;
    case 'Twitter':
      return <FaTwitter className="social-icon social-icon--twitter" />;
    case 'Instagram':
      return <FaInstagram className="social-icon social-icon--instagram" />;
    case 'Mail':
      return <FaRegEnvelope className="social-icon social-icon--google" />;
    case 'Youtube':
      return <FaYoutube className="social-icon social-icon--youtube" />;
    case 'Skype':
      return <FaSkype className="social-icon social-icon--skype" />;
    default:
      return null;
    }
  }

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
              {this.getIconComponent(type)}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}
