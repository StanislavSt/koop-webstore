import { CollectionConnection, CollectionEdge } from '../graphql/types'

export const getArtist = (collections: CollectionConnection) => {
  return collections.edges.find((collection: CollectionEdge) => {
    return collection.node.metafields.edges.find((field) => {
      return field.node.key == 'artist' && field.node.value == 'true'
    })
  })
}
