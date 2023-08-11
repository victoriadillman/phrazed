import Layout from '../../components/layouts';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { IndividualGuess } from '../../components/individualGuess';

export default function Game() {
  const router = useRouter();
  const [phrase, setPhrase] = useState('loading');
  const [isLoading, setLoading] = useState(false);

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
        setLoading(false)
      })
  }, [router.query.id]);

  if (isLoading) return <p>Loading...</p>;

  // Rendering phrase component
  const guessElements = [];
  for (let i = 0; i < 5; i++) {
    guessElements.push(
    <IndividualGuess 
      phrase={phrase}
      key={i + 'key'}
    />)
  }

  return (
  <Layout>
    <p>The phrase is: {phrase}</p>
    {guessElements}
  </Layout>
  );
}