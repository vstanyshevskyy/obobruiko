const replaceValueShortcodes = text => {
  if (typeof text !== 'string') {
    return text;
  }

  const currentYear = new Date().getFullYear();
  return text.replace(/:value-currentYear:/g, currentYear);
};

export default replaceValueShortcodes;
