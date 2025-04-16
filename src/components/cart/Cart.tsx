import { useState } from 'react'
import { gql } from '@apollo/client/core'
import { useQuery, useReactiveVar } from '@apollo/client/react/hooks'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { Button } from '../common'
import { Drawer } from './Drawer'
import CreateCart from '../../graphql/queries/CreateCart'
import storefrontClient from '../../graphql/apollo-client-storefront'
import { CartItem, cartItemsVar } from '../../graphql/cache'

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`

const Cart = () => {
  const { t, i18n } = useTranslation()

  const CartItemsVar = useReactiveVar(cartItemsVar)

  const { data, loading, error } = useQuery<{ cartItems: CartItem[] }>(
    GET_CART_ITEMS
  )

  const [isOpen, setIsOpen] = useState(false)

  if (loading) return <>Loading Cart</>
  if (error) return <p>ERROR: {error.message}</p>

  async function createCart() {
    if (!data?.cartItems) return
    const variables = {
      input: {
        lines: [
          ...data.cartItems.map((item) => {
            return {
              merchandiseId: item.variantId,
              quantity: item.quantity,
            }
          }),
        ],
      },
    }
    const cartData = await storefrontClient.mutate({
      mutation: CreateCart,
      variables,
    })

    const { checkoutUrl } = cartData.data.cartCreate.cart
    window.location.href = checkoutUrl
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
            image: cartItemToRemove.image,
          },
          ...filteredCartItems.slice(index),
        ])
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <div className=" min-w-[99px] rounded-[4px] bg-[#1E90FF] px-2 text-right text-white hover:opacity-70">
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
              className="flex items-center bg-black text-white"
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
                      className="my-2 flex items-center justify-between gap-2 text-[22px]"
                    >
                      <Image
                        src={cartItem.image.url}
                        objectFit="contain"
                        objectPosition="center"
                        alt={cartItem.title}
                        width={75}
                        height={75}
                        quality={35}
                      />
                      <div className="flex w-full items-start justify-between">
                        <section className="flex h-full flex-col justify-between">
                          <span className="inline-block  max-w-[145px] truncate text-[18px] md:max-w-[280px]">
                            {cartItem.title}
                          </span>
                          <section className="flex flex-col text-[16px] text-[#939393]">
                            {Object.values(cartItem.selectedOptions).map(
                              (x) => {
                                return (
                                  <span className="flex items-end" key={x}>
                                    {x}
                                  </span>
                                )
                              }
                            )}
                          </section>
                        </section>
                        <section className="flex flex-col items-end justify-between">
                          <span className="text-[18px] ">
                            {cartItem.quantity} x{' '}
                            <span className="uppercase">
                              {i18n.language === 'en' && t('bgn')}{' '}
                            </span>
                            {Number(cartItem.price).toFixed(2)}
                            {i18n.language === 'bg' && t('bgn')}
                          </span>
                          <button
                            className="cursor-pointer text-[16px] text-[#939393] hover:opacity-60"
                            onClick={() => removeCartItem(cartItem)}
                          >
                            {t('remove')}
                          </button>
                        </section>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div>
                <div className="mt-5 flex justify-between border-t border-t-black p-1 text-[22px]">
                  <div className="text-[30px] capitalize">{t('total')}</div>
                  <div className="text-[30px]">
                    <span className="uppercase">
                      {i18n.language === 'en' && t('bgn')}{' '}
                    </span>
                    {Number(getCartValue()).toFixed(2)}{' '}
                    {i18n.language === 'bg' && t('bgn')}
                  </div>
                </div>
                {data && data.cartItems.length > 0 && (
                  <div className="mt-10 flex justify-center">
                    <Button
                      className="flex w-full items-center justify-center bg-[#1E90FF] p-7 text-center text-white"
                      onClick={() => {
                        createCart()
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

export default Cart
