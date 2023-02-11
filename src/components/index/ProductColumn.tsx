import { ProductWithAnimation } from '../../utils/createProductGrid'
import { ProductCard } from './ProductCard'

export const ProductColumn = ({
  column,
}: {
  column: ProductWithAnimation[]
}) => (
  <div className="flex w-[25%] flex-col">
    {column.map((product) => (
      <div key={product.id} className="pt-5">
        <ProductCard product={product} />
      </div>
    ))}
  </div>
)
