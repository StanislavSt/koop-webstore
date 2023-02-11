import { gql, useQuery, useReactiveVar } from '@apollo/client'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { Button } from '../common'
import { Drawer } from './Drawer'
import CreateCheckout from '../../graphql/queries/CreateCheckout'
import storefrontClient from '../../graphql/apollo-client-storefront'
import { CartItem, cartItemsVar } from '../../graphql/cache'

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`

export const Cart = () => {
  const { t } = useTranslation()

  const CartItemsVar = useReactiveVar(cartItemsVar)

  const { data, loading, error } = useQuery<{ cartItems: CartItem[] }>(
    GET_CART_ITEMS
  )

  const [isOpen, setIsOpen] = useState(false)

  if (loading) return <>Loading Cart</>
  if (error) return <p>ERROR: {error.message}</p>

  async function createCheckout() {
    if (!data?.cartItems) return
    const variables = {
      input: {
        lineItems: [
          ...data.cartItems.map((item) => {
            return {
              variantId: item.variantId,
              quantity: item.quantity,
            }
          }),
        ],
      },
    }
    const checkoutData = await storefrontClient.mutate({
      mutation: CreateCheckout,
      variables,
    })

    const { webUrl } = checkoutData.data.checkoutCreate.checkout
    window.location.href = webUrl
  }

  const getCartLength = () => {
    return (
      (data && data.cartItems.reduce((acc, curr) => acc + curr.quantity, 0)) ??
      0
    )
  }

  const getCartValue = () => {
    return (
      data &&
      data.cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    )
  }

  const removeCartItem = (cartItemToRemove: CartItem) => {
    const currentQuantity = cartItemToRemove.quantity
    const index = CartItemsVar.findIndex(
      (cartItem) => cartItem.variantId === cartItemToRemove.variantId
    )

    const filteredCartItems = CartItemsVar.filter(
      (cartItem) => cartItem.variantId !== cartItemToRemove.variantId
    )
    return currentQuantity === 1
      ? cartItemsVar(filteredCartItems)
      : cartItemsVar([
          ...filteredCartItems.slice(0, index),
          {
            variantId: cartItemToRemove.variantId,
            quantity: currentQuantity - 1,
            price: cartItemToRemove.price,
            title: cartItemToRemove.title,
            selectedOptions: cartItemToRemove.selectedOptions,
          },
          ...filteredCartItems.slice(index),
        ])
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <div className="text-[20px] text-[#1E90FF]">
          {t('cart')} ({getCartLength()})
        </div>
      </button>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="w-full p-5">
          <div className="flex items-center justify-between">
            <div className="text-[20px] text-[#1E90FF]">
              {t('cart')} ({getCartLength()})
            </div>
            <Button
              className="flex items-center bg-[#1E90FF] text-white"
              onClick={() => setIsOpen(false)}
            >
              {t('close')}
            </Button>
          </div>
          {getCartLength() > 0 ? (
            <div className="flex min-h-[85vh] flex-col justify-between">
              <div className="mt-[1rem] flex flex-col">
                {data?.cartItems.map((cartItem: CartItem, index: number) => {
                  return (
                    <div
                      key={index}
                      className="my-2 flex justify-between text-[22px]"
                    >
                      <div>
                        <div className="w-[80%] leading-[23px]">
                          {cartItem.title}
                        </div>
                        <div className="flex flex-col">
                          {Object.values(cartItem.selectedOptions).map((x) => {
                            return (
                              <div key={x} className="leading-6">
                                {x}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div>
                          {cartItem.quantity} x{' '}
                          {Number(cartItem.price).toFixed(2)} {t('bgn')}
                        </div>
                        <div
                          className="cursor-pointer text-[16px] text-[#939393] hover:opacity-60"
                          onClick={() => removeCartItem(cartItem)}
                        >
                          {t('remove')}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div>
                <div className="mt-5 flex justify-between border-t border-t-black p-1 text-[22px]">
                  <div className="text-[30px] capitalize">{t('total')}</div>
                  <div className="text-[30px]">
                    {Number(getCartValue()).toFixed(2)} {t('bgn')}
                  </div>
                </div>
                {data && data.cartItems.length > 0 && (
                  <div className="mt-10 flex justify-center">
                    <Button
                      className="flex w-full items-center justify-center bg-black p-7 text-center text-white"
                      onClick={() => {
                        createCheckout()
                      }}
                    >
                      <span className="text-[24px]">{t('complete order')}</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <span className="mt-20 flex justify-center text-[20px]">
              {t('You have no items in your shopping bag.')}
            </span>
          )}
        </div>
      </Drawer>
    </>
  )
}
