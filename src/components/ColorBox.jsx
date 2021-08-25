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
