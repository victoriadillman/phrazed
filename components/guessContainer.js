import { Textbox } from './textbox';
import { Empty } from './empty'
import utilStyles from '../styles/utils.module.css';
import { useRef } from 'react';

export function GuessContainer({ phrase }) {
  const refs = useRef([]);
  const regex = new RegExp(/^[^a-zA-Z]*$/);

  phrase = phrase.toUpperCase();

  const handleFocus = (nextIndex, backspace) => {
    if (nextIndex < refs.current.length && refs.current[nextIndex]) {
      const nextInput = refs.current[nextIndex];
      nextInput.focus();
      if (backspace) {
        nextInput.value = '';
      }
    }
    else if (nextIndex > refs.current.length) {
      return;
    }
    else {
      handleFocus(nextIndex + 1)
    }
  };

  const arrBox = [];
  let rows = [];
  let space = false;
  for (let i = 0; i < phrase.length; i++) {
    // Logic for spacing
    if (regex.test(phrase[i + 1])) {
      space = true;
    }

    // Logic for words
    if (rows.length > 5 && regex.test(phrase[i])) {
      rows.push(<Empty key={'empty' + i} letter={phrase[i]}/>);
      arrBox.push(rows);
      rows = [];
    } else if (regex.test(phrase[i])) {
      rows.push(<Empty key={'empty' + i} letter={phrase[i]}/>);
      
    } else {
      rows.push(
        <Textbox
          letter={phrase[i]}
          space={space}
          key={i}
          index={i}
          handleFocus={handleFocus}
          ref={(el) => (refs.current[i] = el)}
        />
      );
    }
    space = false;
  }

  return (
    <div>
      {arrBox.map((row, index) => (
        <div className={utilStyles.grid} key={index}>
          {row}
        </div>
      ))}
      <div className={utilStyles.grid}>{rows}</div>
    </div>
  );
}
