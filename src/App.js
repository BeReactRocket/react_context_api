import ColorBox from './components/ColorBox';
import SelectColors from './components/SelectColors';
import { ColorProvider } from './contexts/color_advanced';

function App() {
  return (
    <ColorProvider>
      <div>
        <SelectColors />
        <ColorBox />
      </div>
    </ColorProvider>
  );
}

export default App;
