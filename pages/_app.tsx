import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import { ApolloProvider } from '@apollo/client'
import { Provider as NextAuthProvider } from 'next-auth/client'
import GlobalStyles from '../components/GlobalStyles'
import { client } from '../lib/apollo-client'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
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
