# React Context API

## Basic Concepts

<br>
React assembles an application from multiple components.

How can we share the same data, such as login status, between components that are far away from each other?

The key is that "many" components are "far" apart from each other. If it's close, you can just pass it as props.

However, if you use props, there are a lot of components that needlessly pass through without using them in the middle when data is used globally. This makes data state management and maintenance difficult.

What you need at this point is contextAPI. contextAPI manages data in a component-independent space, so you can get or set data wherever you really need it.

When using contextAPI, remember 3 factors:

<br>

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

---
  <br>

## Advanced
<br>

Or you can set all of your context logics in the same file.

Here we define `Provider` together with `React.createContext`.

And the logic in `Provider` has the same form as the argument of `React.createContext`  (which is used for global state initialization).

By unifying these two structures, we can understand the internal structure of the context more intuitively.

Also, as we saw above, even if `Provider` is omitted, no error occurs.

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
<br>

---
<br>

## Usage

<br>
Now let's put the concepts we've learned into practice.

Clicking on a color in the following color palette will change the color of the two squares accordingly.
  ```js
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  const SelectColors = () => {
    return (
      <div>
        <h2>Choose a color.</h2>
        <div style={{ display: 'flex' }}>
          {colors.map((color) => (
            <div
              key={color}
              style={{
                background: color,
                width: 24,
                height: 24,
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
        <hr />
      </div>
    );
  };

  export default SelectColors;
  ```

Clicking the left mouse button will change the color of the large square, and clicking the right mouse button will change the color of the small square.

To do this, we will import the actions of the `Consumer` that we created in advance.

To actually "consume" the Context, as shown below, let's import a `Consumer` and write logic in it.

And note that in `Consumer`, it is written in the form of "Function as a child".

`Consumer` is a bit smarter than you think.

This is because the value we passed as an argument of `React.createContext` or value props of the `Provider` is remembered as it is.

So you can make your code simpler using destructuring like this:

  ```js
  import { ColorConsumer } from '../contexts/color_advanced';

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  const SelectColors = () => {
    return (
      <div>
        <h2>Choose a color.</h2>
        <ColorConsumer>
          {({ actions }) => (
            <div style={{ display: 'flex' }}>
              {colors.map((color) => (
                <div
                  key={color}
                  style={{
                    background: color,
                    width: 24,
                    height: 24,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    actions.setColor(color);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    actions.setSubcolor(color);
                  }}
                />
              ))}
            </div>
          )}
        </ColorConsumer>
        <hr />
      </div>
    );
  };

  export default SelectColors;
  ```

  While `onClick` is an event handler that detects a left mouse click, `onContextMenu` is an event handler that detects a right mouse click.
  
  Since `onContextMenu` outputs the browser menu by default, let's use `preventDefault` so that the function that changes your color can be executed instead of the browser menu.

<br>

---
<br>

## Mastery
<br>

Now we come to the master stage of contextAPI.

So far we've been using the slightly raw API. Function as a child is less intuitive and the code is a bit longer.

In this case, React.useContext of functional component hooks and static contextType of class component help make the code more concise and intuitive.

## `React.useContext` X `Functional Component`
`useContext` allows you to replace complex logic like `Consumer`.

However, since this is hooks, it can only be used in functional components.

- Get State
  ```js
  import { useContext } from 'react';
  import ColorContext from '../contexts/color_advanced';

  const ColorBox2 = () => {
    const { state } = useContext(ColorContext);
    return (
      <>
        <div style={{ width: 64, height: 64, background: state.color }} />
        <div style={{ width: 32, height: 32, background: state.subcolor }} />
      </>
    );
  };

  export default ColorBox2;
  ```
- Set State
  ```js
  import { useContext } from 'react';
  import ColorContext from '../contexts/color_advanced';

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  export default function SelectColorsHooks() {
    const { actions } = useContext(ColorContext);
    console.log(actions);
    return (
      <div>
        <h2>Choose a color.(useContext)</h2>
        <div style={{ display: 'flex' }}>
          {colors.map((color) => (
            <div
              key={color}
              style={{
                width: 24,
                height: 24,
                background: color,
                cursor: 'pointer',
              }}
              onClick={() => actions.setColor(color)}
              onContextMenu={(e) => {
                e.preventDefault();
                actions.setSubcolor(color);
              }}
            />
          ))}
        </div>
        <hr />
      </div>
    );
  }
  ```

## `static contextType` X `Class Component`

If `contextType` is defined as a static property by using the `static` keyword, an instance of this class can be accessed through the `this.context` keyword.

To do this, we need to assign our custom `Context` to a `static contextType`.

- Get State
  ```js
  import { Component } from 'react';
  import ColorContext from '../contexts/color_advanced';

  export default class ColorBoxCC extends Component {
    static contextType = ColorContext;
    render() {
      return (
        <>
          <h4 style={{ marginTop: 64 }}>ColorBox with static contextType</h4>
          <div
            style={{
              width: 64,
              height: 64,
              background: this.context.state.color,
            }}
          />
          <div
            style={{
              width: 32,
              height: 32,
              background: this.context.state.subcolor,
            }}
          />
        </>
      );
    }
  }
  ```
- Set State
  ```js
  import { Component } from 'react';
  import ColorContext from '../contexts/color_advanced';

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  export default class SelectColorsCC extends Component {
    static contextType = ColorContext;

    render() {
      console.log(this.context);
      return (
        <div>
          <h2>Choose a color.(static contextType)</h2>
          <div style={{ display: 'flex' }}>
            {colors.map((color) => (
              <div
                key={color}
                style={{
                  width: 24,
                  height: 24,
                  background: color,
                  cursor: 'pointer',
                }}
                onClick={() => this.context.actions.setColor(color)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  this.context.actions.setSubcolor(color);
                }}
              />
            ))}
          </div>
          <hr />
        </div>
      );
    }
  }
  ```

  As we saw above, useContext hooks and static contextType make code more beautiful in functional and class components, respectively.
  
   But the big downside is that you can only have one contextType per class.
   
   So let's use a combination of functional components and useContext hooks as recommended by the react team.