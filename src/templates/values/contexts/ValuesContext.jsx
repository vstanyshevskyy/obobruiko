import { createContext } from 'react';

const ValuesContext = createContext({
  values: [],
  options: {},
  onSelectionChange: () => {}
});

export default ValuesContext;
