import React from 'react';
import {
  PiClockCountdownThin,
  PiHeartThin,
  PiChartBarThin,
  PiBrainThin,
  PiShieldCheckThin,
  PiInfoThin,
  PiListChecksThin,
  PiWindThin,
  PiMoonStarsThin,
  PiCalendarCheckThin,
  PiCalendarHeartThin,
  PiExclamationMarkThin,
  PiPersonSimpleTaiChiThin,
  PiBookOpenTextThin,
  PiFlowerLotusThin
} from 'react-icons/pi';
import { CiCircleAlert } from 'react-icons/ci';

const ICON_MAP = {
  PiClockCountdownThin,
  PiHeartThin,
  PiChartBarThin,
  PiBrainThin,
  PiShieldCheckThin,
  PiInfoThin,
  PiListChecksThin,
  PiWindThin,
  PiMoonStarsThin,
  PiCalendarCheckThin,
  PiCalendarHeartThin,
  PiExclamationMarkThin,
  PiPersonSimpleTaiChiThin,
  CiCircleAlert,
  PiBookOpenTextThin,
  PiFlowerLotusThin
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
        margin: '0 12px 0 0'
      }} 
      size={20}
    />
  );
};

export default IconShortcode;
