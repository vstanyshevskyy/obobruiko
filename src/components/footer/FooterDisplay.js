import React from 'react';
import './index.less';

export default ({
  copyrightText
}) => (
  <footer className="footer">
    <div className="footer__inner">
      <div className="footer__copyright">
        {copyrightText}
      </div>
    </div>
  </footer>
);
