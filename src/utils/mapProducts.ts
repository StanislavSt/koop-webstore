import {
  GetArtistQuery,
  GetProductsByTagQuery,
  GetProductsQuery,
} from '../graphql/types'

type ArtistProducts = Pick<
  NonNullable<GetArtistQuery['collectionByHandle']>,
  'products'
>['products']

const mapProducts = async (
  products:
    | GetProductsByTagQuery['products']
    | GetProductsQuery['products']
    | ArtistProducts
) => {
  const productsWithCursor = await Promise.all(
    products.edges.map(async (edge) => {
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
