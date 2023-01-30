import { GetAnnouncementQuery } from '../../graphql/types'
import { ProductWithCursor } from '../../pages'
import Layout from '../layout/Layout'
import AnnouncementBio from './AnnouncementBio'
import AnnouncementProducts from './AnnouncementProducts'

const AnnouncementPage = ({
  announcement,
  products,
}: {
  announcement: GetAnnouncementQuery['collection']
  products: ProductWithCursor[]
}) => {
  if (!announcement) return
  return (
    <Layout title={announcement.title}>
      <AnnouncementBio announcement={announcement} />
      <AnnouncementProducts announcement={announcement} products={products} />
    </Layout>
  )
}

export default AnnouncementPage
