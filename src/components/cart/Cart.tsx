import { gql, useQuery, useReactiveVar } from '@apollo/client'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { Button } from '../common'

import CreateCheckout from '../../graphql/queries/CreateCheckout'
import storefrontClient from '../../graphql/apollo-client-storefront'
import { CartItem, cartItemsVar } from '../../graphql/cache'

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Drawer({ children, isOpen, setIsOpen }: any) {
  return (
    <main
      className={
        'fixed overflow-hidden z-10 inset-0 transform ease-in-out ' +
        (isOpen
          ? 'transition-opacity opacity-100 bg-black bg-opacity-25 duration-500 translate-x-0  '
          : 'delay-[450ms] opacity-0 translate-x-full')
      }
    >
      <section
        className={
          'w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
          (isOpen ? ' translate-x-0 ' : ' translate-x-full')
        }
      >
        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <header className="font-bold text-lg"></header>
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false)
        }}
      ></section>
    </main>
  )
}

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
    const variables = {
      input: {
        lineItems: [...(data?.cartItems ?? [])],
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
        <h3 className="text-[#1E90FF] text-[20px]">
          {t('cart')}: {getCartLength()}
        </h3>
      </button>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="p-5 w-full ">
          <div className="flex justify-between items-center">
            <Button
              className="bg-[#1E90FF] text-white"
              onClick={() => setIsOpen(false)}
            >
              {t('close')}
            </Button>
            <h3 className="text-[#1E90FF] text-[20px]">
              {t('cart')}: {getCartLength()}
            </h3>
          </div>
          {getCartLength() > 0 ? (
            <>
              <div className="flex flex-col mt-[10rem]">
                {data?.cartItems.map((cartItem: CartItem, index: number) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between text-[22px] my-2"
                    >
                      <div>
                        <h2>{cartItem.title}</h2>
                        <div className="flex flex-col">
                          {Object.values(cartItem.selectedOptions).map((x) => {
                            return (
                              <h3 key={x} className="leading-6">
                                {x}
                              </h3>
                            )
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <h2>
                          {cartItem.quantity} x {cartItem.price} {t('bgn')}
                        </h2>
                        <h2
                          className="text-[#939393] text-[16px] cursor-pointer hover:opacity-60"
                          onClick={() => removeCartItem(cartItem)}
                        >
                          {t('remove')}
                        </h2>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-between border-t p-1 border-t-black mt-5 text-[22px]">
                <h2 className="capitalize">{t('total')}</h2>
                <h2>
                  {getCartValue()} {t('bgn')}
                </h2>
              </div>
              {data && data.cartItems.length > 0 && (
                <div className="mt-10 flex justify-center">
                  <Button
                    className="bg-[#1E90FF] text-white text-center"
                    onClick={() => {
                      createCheckout()
                    }}
                  >
                    {t('checkout')}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <h3 className="mt-20 text-[20px] flex justify-center">
              {t('You have no items in your shopping bag.')}
            </h3>
          )}
        </div>
      </Drawer>
    </>
  )
}
