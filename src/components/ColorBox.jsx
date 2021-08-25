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
