/* eslint-disable @next/next/no-img-element */
import { Product, ProductVariantEdge } from '../../graphql/types'
import Layout from '../layout/Layout'
import { cartItemsVar } from '../../graphql/cache'
import { useReactiveVar } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Cart } from '../cart/CartComponent'
const ProductPage = ({ product }: { product: Product }) => {
  const selectedInit: { [key: string]: string } = {}
  const [selectedOptions, setSelected] = useState(selectedInit)
  const [selectedVariant, setVariant] = useState<string | null | undefined>(
    null
  )
  useEffect(() => {
    chooseVariant()
  })

  const compare = (variant: ProductVariantEdge) => {
    if (!product) return
    const matching: { [key: string]: boolean } = {}
    Object.keys(selectedOptions).forEach((prop) => {
      variant.node.selectedOptions.forEach(
        (option: { [key: string]: string }) => {
          if (option.name == prop)
            matching[prop] = option.value == selectedOptions[prop]
        }
      )
    })

    return (
      Object.values(matching).length === Object.keys(product.options).length &&
      Object.values(matching).every((v) => v === true)
    )
  }

  const chooseVariant = () => {
    const variant = product?.variants.edges.filter((variant) => {
      return compare(variant)
    })
    setVariant(variant && variant[0] && variant[0].node.id)
  }

  const CartItemsVar = useReactiveVar(cartItemsVar)
  const firstImage = product?.images.edges[0].node
  return (
    <Layout title="Product page">
      <div className="bg-white">
        <div className="max-w-xs mx-auto py-5 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-15"></div>
        <div className="px-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
          <div className="py-5">
            <h1 className="px-5 py-5">{product?.title}</h1>
            <img
              className="px-5 py-5"
              src={firstImage?.url}
              alt={firstImage?.altText || ''}
            />
          </div>
          <div className="py-5">
            <button
              onClick={() => {
                if (!product || !selectedVariant) return
                cartItemsVar([
                  ...CartItemsVar,
                  { variantId: selectedVariant, quantity: 1 },
                ])
              }}
            >
              Add to Cart
            </button>
            <Cart />
            <div>
              {product &&
                product.options.map((option) => (
                  <div key={option.id}>
                    <h3 className="bg-black text-white"> {option.name}</h3>
                    <ul>
                      {option.values.map((value) => (
                        <li key={option.id}>
                          <button
                            key={option.id}
                            className="hover:bg-sky-700  active:bg-violet-700"
                            onClick={() => {
                              setSelected({
                                ...selectedOptions,
                                [option.name]: value,
                              })
                            }}
                          >
                            {value}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default ProductPage
