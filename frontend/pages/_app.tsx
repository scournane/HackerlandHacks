import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import { moralis } from '../components/constants';
import Navbar from '../components/Navbar/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider serverUrl={moralis.SERVER_URL} appId={moralis.APP_ID}>
      <Navbar />
      <Component {...pageProps} />
    </MoralisProvider>
  )
}

export default MyApp
