import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'

type Props = React.PropsWithChildren<{
  title?: string
}>

const Layout = ({ title = 'KO-OP', children }: Props) => {
  return (
    <div className="p-2 my-0 mx-auto max-w-screen-2xl sm:p-3">
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
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
