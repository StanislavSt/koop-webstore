import { useRouter } from 'next/router'
import Layout from '../layout/Layout'

const TermsAndConditionsPage = () => {
  const { locale } = useRouter()

  const title = locale === 'bg' ? 'Общи Условия' : 'Terms & Conditions'
  return (
    <Layout title={title}>
      {locale === 'bg'
        ? 'Страница общи условия'
        : 'This is terms & conditions page'}
    </Layout>
  )
}

export default TermsAndConditionsPage
