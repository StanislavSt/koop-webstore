import { useReactiveVar } from '@apollo/client/react/hooks/useReactiveVar'

import Layout from '../layout/Layout'
import { ProductWithCursor } from '../../pages'
import UnfilteredProductsGrid from './UnfilteredProductsGrid'
import FilteredProductsGrid from './FilteredProductsGrid'
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
      <div className="min-h-[70vh] bg-white">
        <div className="px-3 py-10">
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
