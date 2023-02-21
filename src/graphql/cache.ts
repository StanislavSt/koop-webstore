import { makeVar, InMemoryCache, ReactiveVar } from '@apollo/client'
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

const isString = (value: unknown) => typeof value === 'string'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getCleanValueForStorage = (value: any) => {
  return isString(value) ? value : JSON.stringify(value)
}

const makeVarPersisted = <T>(
  initialValue: T,
  storageName: string
): ReactiveVar<T> => {
  // If Server Side return normal ReactiveVar
  if (typeof window === 'undefined') return makeVar<T>(initialValue)

  let value = initialValue

  // Try to fetch the value from local storage
  const previousValue = localStorage.getItem(storageName)
  if (previousValue !== null) {
    try {
      const parsed = JSON.parse(previousValue)
      value = parsed
    } catch {
      // It wasn't JSON, assume a valid value
      value = previousValue as unknown as T
    }
  }

  // Create a reactive var with stored/initial value
  const rv = makeVar<T>(value)

  const onNextChange = (newValue: T | undefined) => {
    try {
      // Try to add the value to local storage
      if (newValue === undefined) {
        localStorage.removeItem(storageName)
      } else {
        localStorage.setItem(storageName, getCleanValueForStorage(newValue))
      }
    } catch {
      // ignore
    }

    // Re-register for the next change
    rv.onNextChange(onNextChange)
  }

  // Register for the first change
  rv.onNextChange(onNextChange)

  return rv
}

export const cartItemsVar = makeVarPersisted<CartItem[]>([], 'cartItems')
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
