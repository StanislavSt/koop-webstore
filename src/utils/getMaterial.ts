import { Product } from '../graphql/types'

export const getMaterial = (product: Product) => {
  // const ret = product.metafields.edges.find((field) => {
  //   return field.node.key == 'material'
  // })
  if (product) return null
  return null
}
