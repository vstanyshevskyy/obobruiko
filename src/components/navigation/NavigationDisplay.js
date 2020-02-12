import React from 'react';
import { Link, withPrefix } from 'gatsby';
import classNames from 'classnames';
import {
  FaBars, FaTimes
} from 'react-icons/fa';

import SocialIcons from '../social-icons';
import './index.less';

export default class VpersheNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const {
      className, links = [], location, socialIcons
    } = this.props;
    const { isOpen } = this.state;
    const navClasses = classNames('nav', {
      'nav--expanded': isOpen,
      'nav--custom': className
    });
    return (
      <nav className={navClasses}>
        <div className="nav__inner">
          <ul className="nav__menu" id="nav__menu">
            {links.map(({ url, text }) => {
              const linkClasses = classNames('nav__menu-link', {
                'nav__menu-link--current': location.startsWith(url)
              });
              return (
                <li className="nav__menu-item" key={url}>
                  <Link className={linkClasses} to={url}>{text}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <SocialIcons
          listItemClassName="nav__social-icons-item"
          linkClassName={classNames('nav__social-icons-item-link')}
          listClassName="nav__social-icons"
          icons={socialIcons}
        />
        <button
          type="button"
          onClick={this.toggle}
          className="nav__burger-btn"
          aria-label="Відкрити навігацію"
          aria-expanded={isOpen}
          aria-controls="nav__menu"
        >
          { isOpen ? <FaTimes /> : <FaBars /> }
        </button>
      </nav>
    );
  }
}
