import { Product } from '../graphql/types'
import { ProductWithCursor } from '../pages'

export const getArtists = (product: ProductWithCursor | Product) => {
  if (!product) return

  return product.collections.edges
    .filter((collection) =>
      collection.node.metafields?.find(
        (metaField) =>
          metaField?.key === 'artist' && metaField?.value === 'true'
      )
    )
    .map((collection) => collection.node)
}
