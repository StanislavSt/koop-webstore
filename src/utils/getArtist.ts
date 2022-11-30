import { CollectionEdge } from "../graphql/types"

export const getArtist = (collections: any) => {
    return collections.edges
      .find((collection: CollectionEdge) => {
        return collection.node.metafields.edges
          .find(field => {

            return field.node.key == "artist"
              && field.node.value == "true"
          })
      })
  }
