import '../styles/globals.css'
import { MenuProvider } from '../components/contextMenu'
import { CatalogProvider } from '../components/contextMenu'

function MyApp({ Component, pageProps }) {
  return (
    <MenuProvider>
      <CatalogProvider>
       <Component {...pageProps} />
       </CatalogProvider>
    </MenuProvider>
  )
}

export default MyApp
