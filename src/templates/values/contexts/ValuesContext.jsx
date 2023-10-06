import { createContext } from 'react';

const ValuesContext = createContext({
  values: [],
  valuesMap: {},
  options: {},
  onSelectionChange: () => {}
});

export default ValuesContext;
