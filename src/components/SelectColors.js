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
