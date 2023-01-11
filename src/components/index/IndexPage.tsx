import Layout from '../layout/Layout'
import { ProductWithCursor } from '../../pages'
import UnfilteredProductsGrid from './UnfilteredProductsGrid'
import FilteredProductsGrid from './FilteredProductsGrid'
import { useReactiveVar } from '@apollo/client'
import { filtersVar } from '../../graphql/cache'

const IndexPage = ({ products }: { products: ProductWithCursor[] }) => {
  const filters = useReactiveVar(filtersVar)

  return (
    <Layout title="Home Page">
      <div className="bg-white min-h-[70vh]">
        <div className="py-10 px-3">
          <h2 className="sr-only">Products</h2>
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
