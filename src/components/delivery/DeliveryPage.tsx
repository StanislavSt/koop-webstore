import { useRouter } from 'next/router'
import Layout from '../layout/Layout'

const DeliveryPage = () => {
  const { locale } = useRouter()
  const title = locale === 'bg' ? 'Доставка' : 'Delivery'
  return (
    <Layout title={title}>{locale === 'bg' ? 'Доставка' : 'Delivery'}</Layout>
  )
}

export default DeliveryPage
