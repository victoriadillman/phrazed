import { KeyboardTextbox } from "./keyboardTextbox";
import utilStyles from '../styles/utils.module.css';

export function Keyboard({keyboardLetter}) {

  const row1 = [];
  const row2 = [];
  const row3 = [];
  const alphabet = 'QWERTYUIOPASDFGHJKLZXCVBNM';
  
  for (let i = 0; i < 10; i++) {
    row1.push(
      <KeyboardTextbox
      key={i + 'keyboard'}
      letter={alphabet[i]}
      style={utilStyles[keyboardLetter[alphabet[i]]]}
      textStyle={utilStyles.keyText}
      />
    )
  };
  
  for (let i = 10; i < 19; i++) {
    row2.push(
      <KeyboardTextbox
      key={i + 'keyboard'}
      letter={alphabet[i]}
      style={utilStyles[keyboardLetter[alphabet[i]]]}
      textStyle={utilStyles.keyText}
      />
    )
  };
  
  for (let i = 19; i < 26; i++) {
    row3.push(
      <KeyboardTextbox
      key={i + 'keyboard'}
      letter={alphabet[i]}
      style={utilStyles[keyboardLetter[alphabet[i]]]}
      textStyle={utilStyles.keyText}
      />
    )
  };

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