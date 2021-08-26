import { useContext } from 'react';
import ColorContext from '../contexts/color_advanced';

const ColorBoxHooks = () => {
  const { state } = useContext(ColorContext);
  return (
    <>
      <h4 style={{ marginTop: 48 }}>ColorBox with useContext</h4>
      <div style={{ width: 64, height: 64, background: state.color }} />
      <div style={{ width: 32, height: 32, background: state.subcolor }} />
    </>
  );
};

export default ColorBoxHooks;
