import { useRouter } from 'next/router'
import Layout from '../layout/Layout'

const AboutPage = () => {
  const { locale } = useRouter()
  const title = locale === 'bg' ? 'За нас' : 'About'
  return (
    <Layout title={title}>
      {locale === 'bg' ? 'Страница за нас' : 'This is about page'}
    </Layout>
  )
}

export default AboutPage
