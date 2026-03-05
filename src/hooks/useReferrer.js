import { useMemo } from 'react';

/**
 * Custom hook to detect the referrer from URL query parameters
 * @returns {Object} Referrer information
 * @returns {string|null} returns.referrer - The referrer value from URL params
 * @returns {boolean} returns.isOpenupReferrer - True if referrer is 'openup'
 */
export const useReferrer = () => {
  const referrer = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    return params.get('referrer');
  }, []);

  const isOpenupReferrer = useMemo(
    () => referrer?.toLowerCase() === 'openup',
    [referrer]
  );

  return { referrer, isOpenupReferrer };
};

/**
 * Simplified hook that only returns whether the referrer is OpenUp
 * @returns {boolean} True if referrer is 'openup'
 */
export const useOpenupReferrer = () => {
  const { isOpenupReferrer } = useReferrer();
  return isOpenupReferrer;
};
