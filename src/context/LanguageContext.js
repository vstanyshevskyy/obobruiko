import React from 'react';
import Config from '../config';

const LanguageContext = React.createContext(Config.languages.find(l => l.isDefault).title);

export default LanguageContext;
