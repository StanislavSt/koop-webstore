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
          if (!product) return
          cartItemsVar([
            ...CartItemsVar,
            { variantId: product.variants.edges[0].node.id, quantity: 1 },
          ])
        }}
      >
        Add to Cart
      </button>
    </Layout>
  )
}
export default ProductPage
