import React from 'react';

export default props => {
  const { title, src, alt } = props;
  return (
    <figure className="figure">
      <img
        src={src}
        alt={alt}
      />
      {title && <figcaption>{title}</figcaption>}
    </figure>
  );
};
