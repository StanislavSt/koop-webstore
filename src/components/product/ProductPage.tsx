import { GetProductQuery } from '../../graphql/types'
import Layout from '../layout/Layout'

const ProductPage = ({
  product,
}: {
  product: GetProductQuery['productByHandle']
}) => (
  <Layout title="Product page">
    <div> This is the product page of : {product?.title}</div>
  </Layout>
)
export default ProductPage
