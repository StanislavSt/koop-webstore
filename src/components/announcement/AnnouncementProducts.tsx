import { useEffect, useState } from 'react'
import { GetAnnouncementQuery } from '../../graphql/types'
import { ProductWithCursor } from '../../pages'
import { createProductGrid } from '../../utils/createProductGrid'
import { ProductCard } from '../index/ProductCard'
import { ProductColumn } from '../index/ProductColumn'

const AnnouncementProducts = ({
  products: initialProducts,
}: {
  announcement: GetAnnouncementQuery['collection']
  products: ProductWithCursor[]
}) => {
  const [products, setProducts] = useState(initialProducts)

  // We want to reset the states, if the language has changed
  useEffect(() => {
    const resetStates = () => {
      setProducts(initialProducts)
    }
    resetStates()
  }, [initialProducts])

  const items = createProductGrid(products, initialProducts.length)

  return (
    <>
      {/* Desktop view */}
      <div className="hidden gap-10 md:flex">
        {items ? (
          <>
            <ProductColumn column={items.col1} />
            <ProductColumn column={items.col2} />
            <ProductColumn column={items.col3} />
            <ProductColumn column={items.col4} />
          </>
        ) : (
          <div className="h-[80vh]"> </div>
        )}
      </div>
      {/* Mobile View */}
      <div className="flex flex-col items-center p-3 md:hidden">
        {products &&
          products.map((product) => (
            <div key={product.id} className="pt-5">
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </>
  )
}

export default AnnouncementProducts
