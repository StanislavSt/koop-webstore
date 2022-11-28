import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'

type Props = React.PropsWithChildren<{
  title?: string
}>

const Layout = ({ title = 'KO-OP', children }: Props) => {
  return (
    <div className="max-w-screen-2xl mx-auto my-0">
      <Head>
        <title>{title}</title>
        <meta name="description" content="KO-OP webshop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
