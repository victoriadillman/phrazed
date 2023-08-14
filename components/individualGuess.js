import { Textbox } from './textbox';
import { Empty } from './empty'
import utilStyles from '../styles/utils.module.css';
import { useRef, useState } from 'react';

export function IndividualGuess({phrase}){
  const refs = useRef([]);
  const gridRef = useRef(null);
  const regex = new RegExp(/^[^a-zA-Z]*$/);

  // Logic for blocking input on enter
  const [enabled, setEnable] = useState(true);

    // // Logic for hyphen - VIC this is a work in progress so holding it off for now
    // useEffect(() => {
    //   const handleHyphen = () => {
    //     if (gridRef.current && gridRef.current.scrollHeight > (refs.current[0].scrollHeight + 1)) {
    //       console.log('needs hyphen');
    //     } else {
    //       console.log('no hyphen');
    //     }
    //   };
    //   handleHyphen();
    // }, [gridRef]);
 
  // Function for when user types in a letter
  const handleFocus = (nextIndex, backspace) => {
    if (nextIndex < refs.current.length && refs.current[nextIndex]) {
      const nextInput = refs.current[nextIndex];
      nextInput.focus();
      if (backspace) {
        nextInput.value = '';
      }
    }
    else if (nextIndex > refs.current.length || nextIndex < 0) {
      return;
    }
    else {
      if (backspace) {
        handleFocus(nextIndex - 1, true)
      }
      else {
        handleFocus(nextIndex + 1, false)
      }
    }
  };

  // Creating check letter logic (with colors)
  const letterArr = [];
  const colorArr = [];
  for (let i = 0; i < phrase.length; i++) {
    if (phrase[i] === ' ') {
      letterArr.push('')
    }
    else {
      letterArr.push('-');
    }
    colorArr.push('white')
  }
  const [arrLetters, setArrLetters] = useState(letterArr);
  const [arrColors, setArrColors] = useState(colorArr);
  
  // Logic for the original delivery of rows
  let rows = [];
  let space = false;
  let backspace = false;
  for (let i = 0; i < phrase.length; i++) {

    // Logic for spacing
    if (regex.test(phrase[i + 1])) {
      space = true;
    }
    if (regex.test(phrase[i - 1])) {
      backspace = true;
    }

    // Logic for words
    if (regex.test(phrase[i])) {
      rows.push(<Empty key={'empty' + i} letter={phrase[i]}/>); 
    } else if (rows.length === 0) {
      rows.push(
        <Textbox
          phrase={phrase}
          space={space}
          backspace={backspace}
          key={i}
          index={i}
          handleFocus={handleFocus}
          arrLetters={arrLetters}
          setArrLetters={setArrLetters}
          setArrColors={setArrColors}
          testStyle={utilStyles[arrColors[i]]}
          ref={(el) => (refs.current[i] = el)}
          enabled={enabled}
          setEnable={setEnable}
        />
      );
    } else {
      rows.push(
        <Textbox
          phrase={phrase}
          space={space}
          backspace={backspace}
          key={i}
          index={i}
          handleFocus={handleFocus}
          arrLetters={arrLetters}
          setArrLetters={setArrLetters}
          setArrColors={setArrColors}
          testStyle={utilStyles[arrColors[i]]}
          ref={(el) => (refs.current[i] = el)}
          enabled={enabled}
          setEnable={setEnable}
        />
      );
    }
    space = false;
    backspace = false;
  }

  return (
    <div className={utilStyles.grid} ref={gridRef}>{rows}</div>
  )
}