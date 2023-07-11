import { Textbox } from './textbox';
import { Empty } from './empty'
import utilStyles from '../styles/utils.module.css';
import { useRef } from 'react';

export function GuessContainer({ phrase }) {
  const refs = useRef([]);

  const handleFocus = (nextIndex) => {
    if (nextIndex < refs.current.length && refs.current[nextIndex] !== null) {
      refs.current[nextIndex].focus();
    }
  };

  const arrBox = [];
  let rows = [];
  let space = false;
  for (let i = 0; i < phrase.length; i++) {
    // Logic for spacing
    if (phrase[i + 1] === ' ') {
      space = true;
    }
    if (phrase[i - 1] === ' ') {
      space = false;
    }

    if (rows.length > 5 && phrase[i] === ' ') {
      arrBox.push(rows);
      rows = [];
    } else if (phrase[i] === ' ') {
      rows.push(<Empty key={'empty' + i} />);
      
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
