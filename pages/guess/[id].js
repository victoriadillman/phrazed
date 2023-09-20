import Layout from '../../components/layouts';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { IndividualGuess } from '../../components/individualGuess';

// Wrap the functional component with React.forwardRef

export default function Game() {
  const router = useRouter();
  const [phrase, setPhrase] = useState('loading');
  const [isLoading, setLoading] = useState(false);
  const [isEnabled, setEnable] = useState([])
  const mainRef = useRef([]);

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

  useEffect(() => {
    let phraseSpot = 0;
    let hitTrue = false;
    isEnabled.forEach(elem => {
      if (elem) hitTrue = true;
      else if (!hitTrue) phraseSpot++;
    })
    handleMainFocus((phraseSpot * phrase.length), false)
  }, [isEnabled])

  useEffect(() => {
    setLoading(true)

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
      />
    );
  }

  return (
    <Layout>
      {/* <p>The phrase is: {phrase}</p> */}
      {guessElements}
    </Layout>
  );
}