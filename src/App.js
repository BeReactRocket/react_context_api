import ColorBox from './components/ColorBox';
import ColorBoxCC from './components/ColorBoxCC';
import ColorBoxHooks from './components/ColorBoxHooks';
import Header from './components/Header';
import { ColorProvider } from './contexts/color_advanced';

function App() {
  return (
    <ColorProvider>
      <div>
        <Header />
        <ColorBox />
        <ColorBoxHooks />
        <ColorBoxCC />
      </div>
    </ColorProvider>
  );
}

export default App;
