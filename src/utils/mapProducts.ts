import { GetProductsByTagQuery, GetProductsQuery } from '../graphql/types'

const mapProducts = async (data: GetProductsByTagQuery | GetProductsQuery) => {
  const productsWithCursor = await Promise.all(
    data.products.edges.map(async (edge) => {
      const blurDataURL = await fetch('/api/getBase64', {
        method: 'POST',
        body: JSON.stringify({
          url: edge.node.images.edges[0].node.placeholder,
        }),
      })

      return {
        ...edge.node,
        cursor: edge.cursor,
        blurDataUrl: await blurDataURL.json(),
      }
    })
  )
  return productsWithCursor
}

export default mapProducts
