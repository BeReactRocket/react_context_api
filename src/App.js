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
