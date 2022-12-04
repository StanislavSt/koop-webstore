import { CollectionEdge, Metafield, Product } from '../graphql/types'

export const getMaterial = (product: Product): Metafield | undefined => {
  const ret = product.metafields.edges.find((field) => {
    return field.node.key == 'material'
  })
  return ret?.node
}
