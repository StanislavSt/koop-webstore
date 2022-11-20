import { GetProductQuery } from '../../graphql/types'
import Layout from '../layout/Layout'
import { cartItemsVar } from '../../graphql/cache'
import { useReactiveVar } from '@apollo/client'
const ProductPage = ({
  product,
}: {
  product: GetProductQuery['productByHandle']
}) => {
  const CartItemsVar = useReactiveVar(cartItemsVar)
  return (
    <Layout title="Product page">
      <div> This is the product page of : {product?.title}</div>
      <button
        onClick={() => {
          cartItemsVar([...CartItemsVar, product])
        }}
      >
        {' '}
        Add to Cart
      </button>
    </Layout>
  )
}
export default ProductPage
