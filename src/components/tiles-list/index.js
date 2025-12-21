import React from 'react';
import Tile from '../tile';
import ReactMarkdown from '../markdown';
import './index.less';

export default ({
  id,
  title,
  subtitle,
  items = [],
  firstTileFullWidth
}) => (
  <div className="tiles-list" id={id}>
    {title && <h3 className="tiles-list__title">{title}</h3>}
    {subtitle && (
      <div className="tiles-list__subtitle">
        <ReactMarkdown>{subtitle}</ReactMarkdown>
      </div>
    )}

    <ul className="tiles-list__tiles">
      {items.map((s, index) => (
        <Tile {...s} key={s.url} fullWidth={index === 0 && firstTileFullWidth} />
      ))}
    </ul>
  </div>
);
