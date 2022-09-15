import ProductPage from '../../components/product/ProductPage'
import { client } from '../../graphql/groq-client'

export default ProductPage

export async function getStaticPaths() {
  const allProducts = await client.fetch(
    `*[_type=='product' && store.isDeleted==false]`
  )

  const slugs = allProducts.map((product) => ({
    params: {
      slug: product.store.slug.current,
    },
  }))

  return {
    paths: slugs,
    fallback: false, // can also be true or 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const products = await client.fetch(`*[store.slug.current == "${slug}"]`)

  return {
    props: {
      products,
    },
  }
}
