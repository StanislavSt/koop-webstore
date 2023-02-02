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
        <div className="text-[#1E90FF] text-[20px]">
          {t('cart')} ({getCartLength()})
        </div>
      </button>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="p-5 w-full">
          <div className="flex justify-between items-center">
            <div className="text-[#1E90FF] text-[20px]">
              {t('cart')} ({getCartLength()})
            </div>
            <Button
              className="bg-[#1E90FF] text-white flex items-center"
              onClick={() => setIsOpen(false)}
            >
              {t('close')}
            </Button>
          </div>
          {getCartLength() > 0 ? (
            <div className="flex flex-col justify-between min-h-[85vh]">
              <div className="flex flex-col mt-[1rem]">
                {data?.cartItems.map((cartItem: CartItem, index: number) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between my-2 text-[22px]"
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
                          className="text-[#939393] text-[16px] cursor-pointer hover:opacity-60"
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
                <div className="flex justify-between p-1 mt-5 border-t border-t-black text-[22px]">
                  <div className="capitalize text-[30px]">{t('total')}</div>
                  <div className="text-[30px]">
                    {Number(getCartValue()).toFixed(2)} {t('bgn')}
                  </div>
                </div>
                {data && data.cartItems.length > 0 && (
                  <div className="flex justify-center mt-10">
                    <Button
                      className="flex justify-center items-center p-7 w-full text-center text-white bg-black"
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
            <span className="flex justify-center mt-20 text-[20px]">
              {t('You have no items in your shopping bag.')}
            </span>
          )}
        </div>
      </Drawer>
    </>
  )
}
