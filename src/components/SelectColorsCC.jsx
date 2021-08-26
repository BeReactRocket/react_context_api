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
