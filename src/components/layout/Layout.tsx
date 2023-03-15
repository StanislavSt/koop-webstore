import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'

type Props = React.PropsWithChildren<{
  title?: string
  customOg?: string
}>

const Layout = ({ title = 'KO-OP', customOg, children }: Props) => {
  return (
    <>
      <div className="my-0 mx-auto max-w-screen-2xl p-2 sm:p-3">
        <Head>
          <title>{`${title} | TheKopyShop`}</title>
          <meta name="description" content="KO-OP webshop" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <meta
            name="description"
            content={`The Kopy Shop is a distributor
            of prints and publications by Bulgarian and international artists and publishers. Most of the products are limited edition or printed on demand. The collection features magazines, zines, artist books, photobooks, as well as artworks in different printed media – riso, screen-print and inkjet.`}
          />
          <meta
            property="og:image"
            content={customOg ? customOg : 'https://i.imgur.com/NRFpF1k.png'}
            key="ogImage"
          />
          <meta
            property="og:image"
            content={customOg ? customOg : 'https://i.imgur.com/NRFpF1k.png'}
          />
          <meta
            name="twitter:image"
            content={customOg ? customOg : 'https://i.imgur.com/NRFpF1k.png'}
          />
        </Head>
        <Header />
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout
