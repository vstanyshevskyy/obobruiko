import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';

const LazyReCAPTCHA = forwardRef(({
  shouldLoad = false,
  rootMargin = '200px 0px',
  placeholderText = 'CAPTCHA verification will load automatically',
  loadingText = 'Loading CAPTCHA...',
  ...props
}, ref) => {
  const captchaRef = useRef(null);
  const containerRef = useRef(null);
  const [CaptchaComponent, setCaptchaComponent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    getValue: () => captchaRef.current?.getValue() || null,
    reset: () => captchaRef.current?.reset?.()
  }), []);

  useEffect(() => {
    if (isVisible || typeof window === 'undefined' || !containerRef.current) {
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isVisible, rootMargin]);

  useEffect(() => {
    let isMounted = true;

    if ((!shouldLoad && !isVisible) || CaptchaComponent || typeof window === 'undefined') {
      return () => {
        isMounted = false;
      };
    }

    import('react-google-recaptcha').then(module => {
      if (isMounted) {
        setCaptchaComponent(() => module.default);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [CaptchaComponent, isVisible, shouldLoad]);

  if (!shouldLoad && !isVisible) {
    return (
      <div
        ref={containerRef}
        className="recaptcha-placeholder"
        aria-live="polite"
      >
        {placeholderText}
      </div>
    );
  }

  if (!CaptchaComponent) {
    return (
      <div
        ref={containerRef}
        className="recaptcha-placeholder recaptcha-placeholder--loading"
        aria-live="polite"
      >
        {loadingText}
      </div>
    );
  }

  return <CaptchaComponent ref={captchaRef} {...props} />;
});

export default LazyReCAPTCHA;
