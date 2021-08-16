import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import GlobalStyles from '../components/GlobalStyles'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  )
}
export default MyApp
