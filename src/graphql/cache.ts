import { makeVar, InMemoryCache } from '@apollo/client'

export type CartItem = {
  variantId: string
  quantity: number
  price: number
  title: string
  selectedOptions: Record<string, string>
}
export const cartItemsVar = makeVar<CartItem[]>([])

export const CustomInMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems: {
          read() {
            return cartItemsVar()
          },
        },
      },
    },
  },
})
