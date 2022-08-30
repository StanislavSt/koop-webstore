import { GetStaticProps } from 'next'

import IndexPage from '../components/index/IndexPage'
import { client } from '../graphql/groq-client'
export default IndexPage

export const getStaticProps: GetStaticProps = async () => {
  const post = await client.fetch(`*[_type == "product"]`)

  return {
    props: {
      post,
    },
  }
}
