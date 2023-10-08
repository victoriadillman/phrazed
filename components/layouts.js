import Head from 'next/head';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
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
    </Head>
    <main>{children}</main>
    {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Make your own phrase</Link>
        </div>
      )}
  </div>
  );
}