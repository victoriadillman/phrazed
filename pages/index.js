import Head from 'next/head';
import Layout, { siteTitle } from '../components/layouts';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { URL } from '../components/URL';
import { Entry } from '../components/entry';
import { Random } from '../components/random';
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [isGenerated, setGenerate] = useState(false);
  const [isURL, setURL] = useState('');
  const ref = useRef(null);

  const handleSubmit = async (event, fromForm = true) => {
    if (fromForm) event.preventDefault();

    const data = {
      phrase: event.target.phrase.value
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = '/api/generate-link';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)
    const result = await response.json();
    setGenerate(true);
    setURL(result.urlAdd)
  }

  useEffect(() => {
    const focus = ref.current;
    if (focus !== null) focus.focus()
  }, [ref])

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h1>Welcome to Phrazed</h1>
        <br/>
        <p>How does it work? <Link href='/about/how-it-works'>Click here for details</Link></p>
        <br/>
        <Entry 
        ref={(el) => (ref.current = el)} 
        handleSubmit={handleSubmit}/>
        <Random 
        handleSubmit={handleSubmit}/>
        <br></br>
        <div>
          {isGenerated && <URL isURL={isURL}/>}
        </div>
      </section>
    </Layout>
  );
}