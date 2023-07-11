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
    </Layout>
  )
}