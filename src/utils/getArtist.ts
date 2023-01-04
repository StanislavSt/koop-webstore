import { Product, CollectionEdge } from '../graphql/types'

export const getArtist = (product: Product) => {
  return product.collections.edges.find((collection: CollectionEdge) => {
    return collection.node.metafields.edges.find((field) => {
      return field.node.key == 'artist' && field.node.value == 'true'
    })
  })?.node
}
