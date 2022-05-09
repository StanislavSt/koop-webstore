import { useRouter } from 'next/router'
import Layout from '../layout/Layout'

const ContactPage = () => {
  const { locale } = useRouter()
  const title = locale === 'bg' ? 'Контакт' : 'Contact'
  return (
    <Layout title={title}>
      {locale === 'bg' ? 'Страница контакт' : 'This is contact page'}
    </Layout>
  )
}

export default ContactPage
