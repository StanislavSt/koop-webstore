import { useRouter } from 'next/router'
import Layout from '../layout/Layout'

const InfoPage = () => {
  const { locale } = useRouter()
  const title = locale === 'bg' ? 'Инфо' : 'Info'
  return (
    <Layout title={title}>
      {locale === 'bg' ? 'Страница инфо' : 'This is info page'}
    </Layout>
  )
}

export default InfoPage
