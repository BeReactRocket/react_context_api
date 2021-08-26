import SelectColors from './SelectColors';
import SelectColorsCC from './SelectColorsCC';
import SelectColorsHooks from './SelectColorsHooks';

export default function Header() {
  return (
    <header>
      <div style={{ display: 'flex' }}>
        <SelectColors />
        <SelectColorsCC />
        <SelectColorsHooks />
      </div>
    </header>
  );
}
