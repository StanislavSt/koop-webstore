import ProductPage from '../../components/product/ProductPage'
import { client } from '../../graphql/groq-client'

export default ProductPage

export async function getStaticPaths() {
  const allPosts = await client.fetch(
    `*[_type=='product' && store.isDeleted==false]`
  )

  const slugs = allPosts.map((post: any) => ({
    params: {
      id: post.store.slug.current,
    },
  }))

  console.log('slugs are', slugs)
  return {
    paths: slugs,
    fallback: false, // can also be true or 'blocking'
  }
}

export const getStaticProps: any = async ({ params: { id } }: any) => {
  const post = await client.fetch(`*[store.slug.current == "${id}"]`)
  return {
    props: {
      post,
    },
  }
}
