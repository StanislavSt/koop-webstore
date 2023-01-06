import { Product, CollectionEdge } from '../graphql/types'

export const getArtist = (product: Product) => {
  if (!product) return
  return product.collections.edges.find((collection: CollectionEdge) => {
    return collection.node.metafields?.find(
      (metaField) => metaField?.key === 'artist' && metaField?.value === 'true'
    )
  })?.node
}

export const getArtistName = (product: Product) => {
  if (!product) return
  return product.collections.edges.find((collection) => {
    return collection.node.metafields?.find(
      (metaField) => metaField?.key === 'artist' && metaField?.value === 'true'
    )
  })?.node.title
}
