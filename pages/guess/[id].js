import Layout from '../../components/layouts';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { IndividualGuess } from '../../components/individualGuess';
import { Keyboard } from '../../components/keyboard';
import utilStyles from '../../styles/utils.module.css'
import { Modal } from '../../components/modal';

export default function Game() {
  const router = useRouter();
  const [phrase, setPhrase] = useState('loading');
  const [isLoading, setLoading] = useState(false);
  const [isEnabled, setEnable] = useState([])
  const mainRef = useRef([]);
  // Working on this - idea is changing the keyboard letter to only one val at a time and that will update and use textbox logic
  const [keyboardLetter, setKeyboardLetter] = useState(null);
  const [objLetters, setObjLetters] = useState({});
  const [objColors, setObjColors] = useState({});
  // Success variable
  const [classSuccess, setClassSuccess] = useState('')

  // Pulling up the next input focus on entry, called through the textbox component
  const handleMainFocus = (nextIndex, backspace) => {
    if (nextIndex < mainRef.current.length && mainRef.current[nextIndex]) {
      const nextInput = mainRef.current[nextIndex];
      nextInput.focus();
      if (backspace) {
        nextInput.value = '';
      }
    }
    else if (nextIndex > mainRef.current.length || nextIndex < 0) {
      return;
    }
    else {
      if (backspace) {
        handleMainFocus(nextIndex -1, true);
      }
      else {
        handleMainFocus(nextIndex + 1, false);
      }
    }
  }
  // Func for re-focusing after row submit
  useEffect(() => {
    let phraseSpot = 0;
    let hitTrue = false;
    isEnabled.forEach(elem => {
      if (elem) hitTrue = true;
      else if (!hitTrue) phraseSpot++;
    })
    // Not great to be using setTimeout.. try to find another solution
    setTimeout(() => handleMainFocus((phraseSpot * phrase.length), false), 0)
  }, [isEnabled])

  useEffect(() => {
    setLoading(true);
    
    if (!router.query.id) {
      setLoading(false);
      return;
    }

    const data = {URL: router.query.id};
    const JSONdata = JSON.stringify(data);
    const endpoint = '/api/decrypt-link';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSONdata,
    }
    
    fetch(endpoint, options)
      .then((res) => res.json())
      .then((data) => {
        setPhrase(data.phrase.toUpperCase());
        setLoading(false);
      })
  }, [router.query.id]);

  // Initial loading of keyboard logic
  useEffect(() => {
    const alphabet = 'QWERTYUIOPASDFGHJKLZXCVBNM'
    const newKeyboard = {};
    for (let i = 0; i < alphabet.length; i++) {
      newKeyboard[alphabet[i]] = 'white';
    }
    setKeyboardLetter(newKeyboard);
  }, [])

  if (isLoading) return <p>Loading...</p>;
    
  // Rendering phrase component
  const guessElements = [];
  for (let i = 0; i < 6; i ++) {
    if (i === 0) isEnabled.push(true);
    else isEnabled.push(false);
    guessElements.push(
      <IndividualGuess 
        phrase={phrase}
        key={i}
        guessPoint={i}
        mainRef={mainRef}
        handleMainFocus={handleMainFocus}
        isEnabled={isEnabled}
        setEnable={setEnable}
        keyboardLetter={keyboardLetter}
        setKeyboardLetter={setKeyboardLetter}
        objLetters={objLetters}
        setObjLetters={setObjLetters}
        objColors={objColors}
        setObjColors={setObjColors}
        setClassSuccess={setClassSuccess}
      />
    );
  }

  return (
    <Layout>
      {/* <p>The phrase is: {phrase}</p> */}
      <div className={utilStyles.containerGuess}>
        <h1 className={utilStyles.heading2XL}> Phrazed</h1>
      </div>
      <br/>
      <div className={classSuccess}>
        {guessElements}
        <br></br>
        {keyboardLetter === null ? <div/> : 
        <Keyboard 
          keyboardLetter={keyboardLetter}
        />}
      </div>
      <Modal
      handleMainFocus={handleMainFocus}/>
    </Layout>
  );
}