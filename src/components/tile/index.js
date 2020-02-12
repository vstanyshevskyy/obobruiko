import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import classnames from 'classnames';
import { getUniqueId, CardClickHelper } from '../../helpers';
import './index.less';

export default class ServiceTile extends React.Component {
  constructor(props) {
    super(props);

    this.clickHelper = new CardClickHelper();
  }

  render() {
    const {
      image,
      title,
      subtitle,
      url,
      fullWidth
    } = this.props;
    const uid = getUniqueId(url);
    const tileClassName = 'tile';
    const classNames = classnames(tileClassName, { [`${tileClassName}--full-width`]: fullWidth });
    const textUid = `${tileClassName}-${uid}`;
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <li
        className={classNames}
        onMouseUp={e => this.clickHelper.onMouseUp(e)}
        onMouseDown={e => this.clickHelper.onMouseDown(e)}
      >
        <Img alt="" className="tile__image" fluid={image.childImageSharp.fluid} />
        <div className="tile__text-container">
          <Link
            className="tile__title"
            to={url}
            aria-describedby={textUid}
            ref={el => this.clickHelper.addLink(el)}
          >
            {title}
          </Link>
          <p className="tile__subtitle" id={textUid}>{subtitle}</p>
        </div>
      </li>
    );
  }
}

