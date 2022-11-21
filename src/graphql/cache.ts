import { makeVar, InMemoryCache } from '@apollo/client'

export const cartItemsVar = makeVar<{ variantId: string; quantity: number }[]>(
  []
)

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
