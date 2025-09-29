import React, { useEffect } from 'react';
import config from '../cms/config';

const AdminPage = () => {
  useEffect(() => {
    window.CMS_MANUAL_INIT = true;
    import('decap-cms').then(CMS => {
      CMS.init({ config });
    });
  }, []);

  return <div id="nc-root" />;
};

export default AdminPage;
