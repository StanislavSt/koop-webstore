import { Product, CollectionEdge } from '../graphql/types'
import { ProductWithCoverImage } from '../pages'

export const getArtist = (product: Product) => {
  return product.collections.edges.find((collection: CollectionEdge) => {
    return collection.node.metafields.edges.find((field) => {
      return field.node.key == 'artist' && field.node.value == 'true'
    })
  })?.node
}

export const getArtistName = (
  product: Product | ProductWithCoverImage
): string | undefined => {
  return product.collections.edges.find((collection) => {
    return collection.node.metafields.edges.find((field) => {
      return field.node.key == 'artist' && field.node.value == 'true'
    })
  })?.node.title
}
