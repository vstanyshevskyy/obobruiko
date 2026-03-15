import React, { useEffect } from 'react';

import config from '../cms/config';

const AdminPage = () => {
  useEffect(() => {
    let isMounted = true;
    const originalStartViewTransition = document.startViewTransition?.bind(document);

    window.CMS_MANUAL_INIT = true;

    if (originalStartViewTransition) {
      document.startViewTransition = (...args) => {
        const transition = originalStartViewTransition(...args);

        transition?.finished?.catch((error) => {
          if (error?.message !== 'Transition was skipped') {
            throw error;
          }
        });

        return transition;
      };
    }

    import('@sveltia/cms').then(({ init }) => {
      if (isMounted) {
        init({ config });
      }
    });

    return () => {
      isMounted = false;
      if (originalStartViewTransition) {
        document.startViewTransition = originalStartViewTransition;
      }
    };
  }, []);

  return <div id="nc-root" />;
};

export const Head = () => (
  <>
    <title>CMS Admin</title>
    <meta name="robots" content="noindex,nofollow" />
  </>
);

export default AdminPage;
