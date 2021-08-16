import Head from 'next/head'
import Field from '../components/Field'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Soccer Board App</title>
        <meta name='description' content='Digital soccer board application.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <p>home</p>
      <Field />
    </>
  )
}
