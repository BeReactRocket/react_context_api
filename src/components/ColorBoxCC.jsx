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
