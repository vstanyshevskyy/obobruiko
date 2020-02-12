import React from 'react';
import Tile from '../tile';
import './index.less';

export default ({
  title,
  subtitle,
  items = [],
  firstTileFullWidth
}) => (
  <div className="tiles-list">
    <h3 className="tiles-list__title">{title}</h3>
    <p className="tiles-list__subtitle">{subtitle}</p>
    <ul className="tiles-list__tiles">
      {items.map((s, index) => (
        <Tile {...s} key={s.url} fullWidth={index === 0 && firstTileFullWidth} />
      ))}
    </ul>
  </div>
);
