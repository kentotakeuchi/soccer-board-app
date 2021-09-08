import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import { ApolloProvider } from '@apollo/client'
import { SessionProvider as NextAuthProvider } from 'next-auth/react'
import GlobalStyles from '../components/GlobalStyles'
import { client } from '../lib/apollo-client'

function MyApp({ Component, pageProps: { session, ...pageProps }, router }: AppProps) {
  return (
    <NextAuthProvider session={session}>
      <ApolloProvider client={client}>
        <GlobalStyles />
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </ApolloProvider>
    </NextAuthProvider>
  )
}
export default MyApp
