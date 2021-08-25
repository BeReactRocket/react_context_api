# React Context API

### Basic Concepts  
- `Context Store : Where you initialize context`
  ```js
  import { createContext } from 'react';

  // Pass a value to the parameter otherwise use <Context.Provider>.
  const ColorContext = createContext({ color: 'black' });

  export default ColorContext;
  ```
- `Context Consumer : Where you actually use context`
  ```js
  import ColorContext from '../contexts/color';

  const ColorBox = () => {
    return (
      <ColorContext.Consumer>
        {/* Function as a child(Render Props) */}
        {(value) => (
          <div style={{ width: 64, height: 64, background: value.color }} />
        )}
      </ColorContext.Consumer>
    );
  };

  export default ColorBox;
  ```
- `Context Provider : Where your app manage state globally`
  ```js
  import ColorBox from './components/ColorBox';
  import ColorContext from './contexts/color';

  function App() {
    return (
      <ColorContext.Provider value={{ color: 'tomato' }}>
        <div>
          <ColorBox />
        </div>
      </ColorContext.Provider>
    );
  }

  export default App;
  ```
  <br>

  Either `React.createContext` or `<Provider>`(which is derived from the former) can specify the initial state of the context.  
  To use `React.createContext`, pass a value to the parameter,  
  and to use `<Provider>`, pass a value to the value props.  
  And values don't necessarily have to be static - functions can be used as well.