import { KeyboardTextbox } from "./keyboardTextbox";
import utilStyles from '../styles/utils.module.css';

export function Keyboard({keyboardLetter, setKeyboardLetter}) {
  const alphabet = 'qwertyuiopasdfghjklzxcvbnm';
  const row1 = [];
  for (let i = 0; i < 10; i++) {
    row1.push(
      <KeyboardTextbox
      letter={alphabet[i]}
      style={utilStyles[keyboardLetter[i]]}
      />
    )
  }
  const row2 = [];
  for (let i = 10; i < 19; i++) {
    row2.push(
      <KeyboardTextbox
      letter={alphabet[i]}
      style={utilStyles[keyboardLetter[i]]}
      />
    )
  }
  const row3 = [];
  for (let i = 19; i < 26; i++) {
    row3.push(
      <KeyboardTextbox
      letter={alphabet[i]}
      style={utilStyles[keyboardLetter[i]]}
      />
    )
  }

  return (
    <div>
      <div className={utilStyles.grid}>
        {row1}
      </div>
      <div className={utilStyles.grid}>
        {row2}
      </div>
      <div className={utilStyles.grid}>
        {row3}
      </div>
    </div>
  )
}