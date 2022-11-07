import '../styles/globals.css'
import TilesProvider from './contexts/TilesContext'

function MyApp({ Component, pageProps }) {
  return (<TilesProvider><Component {...pageProps} /></TilesProvider>)
}

export default MyApp
