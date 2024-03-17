import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import './index.less';

const CounterBlock = ({ number, description }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
      let counter = Math.floor(number * 0.9);
      const interval = setInterval(() => {
        if (counter < number) {
          setCount(counter + 1);
          counter++;
        } else {
          clearInterval(interval);
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [inView, number]);

  return (
    <div className="counter-block" ref={ref}>
      <div className="number">{isVisible ? count : 0}</div>
      <div className="description">{description}</div>
    </div>
  );
};

const AchievementsCounter = () => (
  <div className="counter-container">
    <CounterBlock number={5} description="years of practice" />
    <CounterBlock number={280} description="individuals" />
    <CounterBlock number={34} description="countries" />
    <CounterBlock number={6} description="continents" />
    <CounterBlock number={830} description="individual consultations" />
    <CounterBlock number={30} description="group consultations" />
    <CounterBlock number={37} description="workshops" />
    <CounterBlock number={3} description="languages" />
  </div>
);

export default AchievementsCounter;
