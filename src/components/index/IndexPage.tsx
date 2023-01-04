import React from 'react'
import { ProductWithCoverImage } from '../../pages'

import Layout from '../layout/Layout'
import { ProductCard } from './ProductCard'

const IndexPage = ({ products }: { products: ProductWithCoverImage[] }) => {
  return (
    <Layout title="Home Page">
      <div className="bg-white">
        <div className="py-10 px-3">
          <h2 className="sr-only">Products</h2>
          <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4">
            {products.map((product) => (
              <div key={product.id} className="pt-5 break-inside-avoid-column">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
