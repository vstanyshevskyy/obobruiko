import React, { useContext } from 'react';
import LanguageContext from '../../context/LanguageContext';
import { useConsent } from '../../context/ConsentContext';
import './index.less';

const contentByLanguage = {
  EN: {
    acceptAll: 'Accept',
    bannerText: 'This site uses Google Analytics only if you allow analytics cookies.',
    modalTitle: 'Privacy preferences',
    rejectAll: 'Reject'
  },
  RU: {
    acceptAll: 'Разрешить',
    bannerText: 'Этот сайт использует Google Analytics только если вы разрешите аналитические cookies.',
    modalTitle: 'Настройки конфиденциальности',
    rejectAll: 'Отклонить'
  },
  UK: {
    acceptAll: 'Дозволити',
    bannerText: 'Цей сайт використовує Google Analytics лише якщо ви дозволите аналітичні cookies.',
    modalTitle: 'Налаштування конфіденційності',
    rejectAll: 'Відхилити'
  }
};

function ConsentBanner() {
  const language = useContext(LanguageContext);
  const {
    acceptAll,
    consent,
    isBannerOpen,
    isHydrated,
    rejectAll
  } = useConsent();
  const copy = contentByLanguage[language] || contentByLanguage.EN;

  if (!isHydrated) {
    return null;
  }

  const shouldShowBanner = consent.status === 'unknown' || isBannerOpen;

  return shouldShowBanner ? (
    <div className="consent-banner" role="region" aria-label={copy.modalTitle}>
      <div className="consent-banner__content">
        <p className="consent-banner__text">{copy.bannerText}</p>
        <div className="consent-banner__actions">
          <button type="button" className="consent-banner__button consent-banner__button--secondary" onClick={rejectAll}>
            {copy.rejectAll}
          </button>
          <button type="button" className="consent-banner__button consent-banner__button--primary" onClick={acceptAll}>
            {copy.acceptAll}
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default ConsentBanner;
