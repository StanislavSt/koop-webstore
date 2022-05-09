import { useRouter } from 'next/router'
import Layout from '../layout/Layout'

const PrivacyPolicyPage = () => {
  const { locale } = useRouter()
  const title = locale === 'bg' ? 'Политика за поверителност' : 'Privacy Policy'
  return (
    <Layout title={title}>
      {locale === 'bg'
        ? 'Страница политика за поверителност'
        : 'This is privacy policy page'}
    </Layout>
  )
}

export default PrivacyPolicyPage
