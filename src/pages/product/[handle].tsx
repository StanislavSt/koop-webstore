import ProductPage from '../../components/product/ProductPage'
import GetProduct from '../../graphql/queries/GetProduct'
import {
  GetProductQuery,
  GetProductQueryVariables,
  GetProductHandlesQuery,
  GetProductHandlesQueryVariables,
  LanguageCode,
} from '../../graphql/types'
import client from '../../graphql/apollo-client-storefront'
import { GetStaticPaths } from 'next/types'
import GetProductHandles from '../../graphql/queries/GetProductHandles'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default ProductPage

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<
    GetProductHandlesQuery,
    GetProductHandlesQueryVariables
  >({
    query: GetProductHandles,
    variables: { first: 200 },
  })
  const paths = data.products.edges.map((edge) => ({
    params: { handle: edge.node.handle },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({
  params,
  locale = 'en',
}: {
  params: { handle: string }
  locale: 'en' | 'bg'
}) => {
  const { data } = await client.query<
    GetProductQuery,
    GetProductQueryVariables
  >({
    query: GetProduct,
    variables: {
      productHandle: params.handle,
      language: locale === 'bg' ? LanguageCode.Bg : LanguageCode.En,
    },
  })

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      product: data.product,
    },
    revalidate: 10,
  }
}
