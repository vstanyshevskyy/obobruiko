import React from 'react';
import {
  PiClockCountdown,
  PiHeart,
  PiChartBar,
  PiBrain,
  PiShieldCheck,
  PiInfo,
  PiListChecks,
  PiWind,
  PiMoonStars,
  PiCalendarCheck,
  PiCalendarHeart,
  PiExclamationMark,
  PiPersonSimpleTaiChi,
  PiBookOpenText,
  PiFlowerLotus,
  PiPhone,
  PiGlobe,
  PiChatCircleDots
} from 'react-icons/pi';
import { CiCircleAlert } from 'react-icons/ci';

const ICON_MAP = {
  PiClockCountdown,
  PiHeart,
  PiChartBar,
  PiBrain,
  PiShieldCheck,
  PiInfo,
  PiListChecks,
  PiWind,
  PiMoonStars,
  PiCalendarCheck,
  PiCalendarHeart,
  PiExclamationMark,
  PiPersonSimpleTaiChi,
  CiCircleAlert,
  PiBookOpenText,
  PiFlowerLotus,
  PiPhone,
  PiGlobe,
  PiChatCircleDots
};

const IconShortcode = ({ code }) => {
  const IconComponent = ICON_MAP[code];
  
  if (!IconComponent) {
    return <span>{`:icon-${code}:`}</span>;
  }

  return (
    <IconComponent
      style={{ 
        display: 'inline-block',
        verticalAlign: 'sub',
        margin: '0 6px 0 0'
      }} 
      size={20}
    />
  );
};

export default IconShortcode;
