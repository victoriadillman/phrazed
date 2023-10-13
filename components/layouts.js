import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';

export const siteTitle = 'Phrazed';

export default function Layout({ children, home }) {
  return (
  <div className={styles.container}>
    <Head>
      <meta 
      name="description"
      content="Send phrases to friends for them to guess"
      />
      <meta name="og:title" content={siteTitle} />
      <link rel="shortcut icon" href="/image/favicon.ico" />
    </Head>
    <main>
      {children}
    </main>
    {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Send your own phrase</Link>
        </div>
      )}
  </div>
  );
}