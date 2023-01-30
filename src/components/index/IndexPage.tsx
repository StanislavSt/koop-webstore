import Layout from '../layout/Layout'
import { ProductWithCursor } from '../../pages'
import UnfilteredProductsGrid from './UnfilteredProductsGrid'
import FilteredProductsGrid from './FilteredProductsGrid'
import { useReactiveVar } from '@apollo/client'
import { filtersVar } from '../../graphql/cache'
import AnnouncementBanner from '../announcement/AnnouncementBanner'
import { GetAnnouncementQuery } from '../../graphql/types'

const IndexPage = ({
  products,
  announcement,
}: {
  products: ProductWithCursor[]
  announcement: GetAnnouncementQuery['collection']
}) => {
  const filters = useReactiveVar(filtersVar)

  return (
    <Layout title="Home">
      <div className="bg-white min-h-[70vh]">
        <div className="py-10 px-3">
          <h2 className="sr-only">Products</h2>
          <AnnouncementBanner announcement={announcement} />
          {filters.format ? (
            <FilteredProductsGrid />
          ) : (
            <UnfilteredProductsGrid products={products} />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
