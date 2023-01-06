import { Product, CollectionEdge } from '../graphql/types'
import { ProductWithCoverImage } from '../pages'

export const getArtist = (product: Product) => {
  if (!product) return
  return product.collections.edges.find((collection: CollectionEdge) => {
    return collection.node.metafields?.find(
      (metaField) => metaField?.key === 'artist' && metaField?.value === 'true'
    )
  })?.node
}

export const getArtistName = (product: ProductWithCoverImage) => {
  if (!product) return
  return product.collections.edges.find((collection) => {
    return collection.node.metafields?.find(
      (metaField) => metaField?.key === 'artist' && metaField?.value === 'true'
    )
  })?.node.title
}
