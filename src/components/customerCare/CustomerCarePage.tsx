import { useRouter } from 'next/router'
import Layout from '../layout/Layout'

const CustomerCarePage = () => {
  const { locale } = useRouter()
  const title = locale === 'bg' ? 'Как да поръчам' : 'Customer Care'
  return (
    <Layout title={title}>
      {locale === 'bg'
        ? 'Страница как да поръчам'
        : 'This is customer care page'}
    </Layout>
  )
}

export default CustomerCarePage
