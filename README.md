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
  <br>
  <br>
---
  <br>

### Advanced

Or you can set all of your context logics in the same file.

Here we define `Provider` together with `React.createContext`.

And the logic in `Provider` has the same form as the argument of `React.createContext`  (which is used for global state initialization).

By unifying these two structures, we can understand the internal structure of the context more intuitively.

Also, as we saw above, even if Provider is omitted, no error occurs.

- `Context Store : Where you initialize context`

  ```js
  import { createContext, useState } from 'react';

  const ColorContext = createContext({
    state: { color: 'black', subcolor: 'tomato' },
    actions: {
      setColor: () => {},
      setSubcolor: () => {},
    },
  });

  const ColorProvider = ({ children }) => {
    const [color, setColor] = useState('black');
    const [subcolor, setSubcolor] = useState('tomato');

    const value = {
      state: { color, subcolor },
      actions: { setColor, setSubcolor },
    };

    return (
      <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
    );
  };

  const { Consumer: ColorConsumer } = ColorContext;

  export { ColorConsumer, ColorProvider };

  export default ColorContext;
  ```
- `Context Consumer : Where you actually use context`
  ```js
  import { ColorConsumer } from '../contexts/color_advanced';

  const ColorBox = () => {
    return (
      <ColorConsumer>
        {/* Function as a child(Render Props) */}
        {(value) => (
          <>
            <div
              style={{ width: 64, height: 64, background: value.state.color }}
            />
            <div
              style={{ width: 32, height: 32, background: value.state.subcolor }}
            />
          </>
        )}
      </ColorConsumer>
    );
  };

  export default ColorBox;
  ```

  - `Context Provider : Where your app manage state globally`
  ```js
  import ColorBox from './components/ColorBox';
  import { ColorProvider } from './contexts/color_advanced';

  function App() {
    return (
      <ColorProvider>
        <div>
          <ColorBox />
        </div>
      </ColorProvider>
    );
  }

  export default App;
  ```