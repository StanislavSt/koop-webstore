import { Product } from '../graphql/types'

export const getMaterial = (product: Product) => {
  const ret = product.metafields.find((field) => {
    return field && field.key == 'material'
  })

  return ret
}
