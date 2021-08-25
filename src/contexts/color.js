import { createContext } from 'react';

// Give a value in parameter otherwise use <Context.Provider>.
const ColorContext = createContext({ color: 'black' });

export default ColorContext;
