import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import PropTypes from 'prop-types';
import Config from '../config';

const STORAGE_KEY = 'bobruiko-consent-v1';
const GTM_SCRIPT_ID = 'bobruiko-gtm-script';

const defaultConsent = {
  analytics: false,
  status: 'unknown',
  updatedAt: null
};

const ConsentContext = createContext({
  consent: defaultConsent,
  isHydrated: false,
  isBannerOpen: false,
  acceptAll: () => {},
  rejectAll: () => {},
  openBanner: () => {}
});

const isBrowser = () => typeof window !== 'undefined';

const readStoredConsent = () => {
  if (!isBrowser()) {
    return defaultConsent;
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return defaultConsent;
    }

    const parsedValue = JSON.parse(rawValue);

    if (!parsedValue || (parsedValue.status !== 'accepted' && parsedValue.status !== 'rejected')) {
      return defaultConsent;
    }

    return {
      analytics: Boolean(parsedValue.analytics),
      status: parsedValue.status,
      updatedAt: parsedValue.updatedAt || null
    };
  } catch (error) {
    return defaultConsent;
  }
};

const persistConsent = consent => {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
};

const ensureDataLayer = () => {
  if (!isBrowser()) {
    return [];
  }

  window.dataLayer = window.dataLayer || [];

  return window.dataLayer;
};

const ensureGtag = () => {
  if (!isBrowser()) {
    return () => {};
  }

  ensureDataLayer();

  if (!window.gtag) {
    window.gtag = function gtag(...args) {
      window.dataLayer.push(args);
    };
  }

  return window.gtag;
};

const buildConsentState = analyticsEnabled => ({
  ad_personalization: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  analytics_storage: analyticsEnabled ? 'granted' : 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted'
});

const applyGoogleConsent = (mode, analyticsEnabled) => {
  if (!isBrowser()) {
    return;
  }

  const gtag = ensureGtag();
  const consentState = buildConsentState(analyticsEnabled);

  if (mode === 'default') {
    gtag('consent', 'default', {
      ...consentState,
      wait_for_update: 500
    });
    return;
  }

  gtag('consent', 'update', consentState);
};

const injectGtm = gtmId => {
  if (!isBrowser() || !gtmId) {
    return false;
  }

  if (document.getElementById(GTM_SCRIPT_ID)) {
    return true;
  }

  ensureDataLayer().push({
    'gtm.start': Date.now(),
    event: 'gtm.js'
  });

  const scriptTag = document.createElement('script');
  const firstScript = document.getElementsByTagName('script')[0];

  scriptTag.async = true;
  scriptTag.id = GTM_SCRIPT_ID;
  scriptTag.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;

  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(scriptTag, firstScript);
  } else {
    document.head.appendChild(scriptTag);
  }

  return true;
};

const clearCookie = (name, domain) => {
  const domainPart = domain ? `domain=${domain};` : '';
  const expiry = 'expires=Thu, 01 Jan 1970 00:00:00 GMT;';

  document.cookie = `${name}=;${expiry}path=/;${domainPart}SameSite=Lax`;
};

const clearGoogleAnalyticsCookies = () => {
  if (!isBrowser()) {
    return;
  }

  const hostParts = window.location.hostname.split('.');
  const domainVariants = [''];

  if (hostParts.length >= 2) {
    domainVariants.push(`.${hostParts.slice(-2).join('.')}`);
  }

  if (hostParts.length >= 3) {
    domainVariants.push(`.${hostParts.slice(-3).join('.')}`);
  }

  document.cookie
    .split(';')
    .map(cookie => cookie.trim().split('=')[0])
    .filter(cookieName => cookieName.startsWith('_ga') || cookieName === '_gid' || cookieName === '_gat')
    .forEach(cookieName => {
      domainVariants.forEach(domainVariant => clearCookie(cookieName, domainVariant));
    });
};

const pushRouteChangeEvent = () => {
  if (!isBrowser()) {
    return;
  }

  ensureDataLayer().push({
    event: 'gatsby-route-change',
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title
  });
};

export function ConsentProvider({ children, locationPath }) {
  const [consent, setConsent] = useState(defaultConsent);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isGtmLoaded, setIsGtmLoaded] = useState(false);

  useEffect(() => {
    const storedConsent = readStoredConsent();

    setConsent(storedConsent);
    applyGoogleConsent('default', storedConsent.analytics && storedConsent.status === 'accepted');
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || consent.status === 'unknown' || !consent.analytics) {
      return;
    }

    setIsGtmLoaded(injectGtm(Config.gtm && Config.gtm.id));
  }, [consent.analytics, consent.status, isHydrated]);

  useEffect(() => {
    if (!isHydrated || !isGtmLoaded || !consent.analytics || consent.status !== 'accepted' || !isBrowser()) {
      return;
    }

    pushRouteChangeEvent();
  }, [consent.analytics, consent.status, isGtmLoaded, isHydrated, locationPath]);

  const updateConsent = analyticsEnabled => {
    const wasAnalyticsEnabled = consent.analytics && consent.status === 'accepted';
    const nextConsent = {
      analytics: analyticsEnabled,
      status: analyticsEnabled ? 'accepted' : 'rejected',
      updatedAt: new Date().toISOString()
    };

    setConsent(nextConsent);
    persistConsent(nextConsent);
    applyGoogleConsent('update', analyticsEnabled);

    if (!analyticsEnabled) {
      clearGoogleAnalyticsCookies();
    }

    if (analyticsEnabled && !wasAnalyticsEnabled) {
      const gtmWasLoaded = injectGtm(Config.gtm && Config.gtm.id);

      setIsGtmLoaded(gtmWasLoaded);

      if (gtmWasLoaded) {
        pushRouteChangeEvent();
      }
    }

    setIsBannerOpen(false);
  };

  const value = useMemo(() => ({
    consent,
    isHydrated,
    isBannerOpen,
    acceptAll: () => updateConsent(true),
    rejectAll: () => updateConsent(false),
    openBanner: () => setIsBannerOpen(true)
  }), [consent, isBannerOpen, isHydrated]);

  return (
    <ConsentContext.Provider value={value}>
      {children}
    </ConsentContext.Provider>
  );
}

ConsentProvider.propTypes = {
  children: PropTypes.node.isRequired,
  locationPath: PropTypes.string
};

ConsentProvider.defaultProps = {
  locationPath: ''
};

export const useConsent = () => useContext(ConsentContext);

export default ConsentContext;
