import Head from 'next/head'
import Field from '../components/Field'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home | Soccer Board App</title>
        <meta name='description' content='Digital soccer board application.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Field />
      <p>home</p>
    </>
  )
}
