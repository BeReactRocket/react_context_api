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
