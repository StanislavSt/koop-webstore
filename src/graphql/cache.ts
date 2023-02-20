import { makeVar, InMemoryCache } from '@apollo/client'
import { Image } from './types'

export type CartItem = {
  variantId: string
  quantity: number
  price: number
  title: string
  selectedOptions: Record<string, string>
  image: Image
}
export type Filters = {
  format: 'publications' | 'prints' | ''
  technique:
    | 'art'
    | 'architecture'
    | 'archive'
    | 'design'
    | 'illustration'
    | 'magazine'
    | 'photography'
    | 'photobook'
    | 'theory & writing'
    | 'zine'
    | 'screen print'
    | 'illustration'
    | 'digital'
    | 'riso'
    | ''
}

export const cartItemsVar = makeVar<CartItem[]>([])
export const filtersVar = makeVar<Filters>({ format: '', technique: '' })

export const CustomInMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems: {
          read() {
            return cartItemsVar()
          },
        },
        filters: {
          read() {
            return filtersVar()
          },
        },
      },
    },
  },
})
