import React from 'react';
import Config from '../config';

const LanguageContext = React.createContext(Config.languages.find(l => l.isDefault));

export default LanguageContext;
