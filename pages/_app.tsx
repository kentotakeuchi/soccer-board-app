import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import { ApolloProvider } from '@apollo/client'
import GlobalStyles from '../components/GlobalStyles'
import { client } from '../lib/apollo-client'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <GlobalStyles />
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </ApolloProvider>
    </>
  )
}
export default MyApp
