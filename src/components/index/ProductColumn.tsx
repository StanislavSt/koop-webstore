import { ProductWithAnimation } from '../../utils/createProductGrid'
import { ProductCard } from './ProductCard'

export const ProductColumn = ({
  column,
}: {
  column: ProductWithAnimation[]
}) => (
  <div className="flex flex-col w-[25%]">
    {column.map((product) => (
      <div key={product.id} className="pt-5">
        <ProductCard product={product} />
      </div>
    ))}
  </div>
)
