import React from 'react';
import './index.less';

const Banner = ({ message, type = 'success' }) => {
  if (!message) return null;

  return (
    <div className={`banner banner--${type}`}>
      <p>{message}</p>
    </div>
  );
};

export const ErrorBanner = ({ message }) => {
  return <Banner message={message} type="error" />;
};

export const SuccessBanner = ({ message }) => {
  return <Banner message={message} type="success" />;
};

export default ErrorBanner;