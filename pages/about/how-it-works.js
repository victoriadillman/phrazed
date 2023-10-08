import Layout, {siteTitle} from "../../components/layouts";
import Head from "next/head";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>
        Type in any phrase your heart desires! Send the link to whoever you want.
      </h1>
      <br/>
      <p>They'll have six tries to guess your phrase.
        <br/> Each time they guess, they'll be told which letter is...
        <br/> In the correct spot (green)
        <br/> In the word but not the correct spot (yellow)
        <br/> In the phrase but not the word (purple)
        <br/> Not in the phrase (gray)
        <br/><br/> Good luck to them!
      </p>
    </Layout>
  )
}