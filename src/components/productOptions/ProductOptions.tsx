/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { Product } from '../../graphql/types'
import { Button } from '../common'

const notInStock: React.CSSProperties = {
  textDecoration: 'line-through',
  color: '#BFBFBF',
  pointerEvents: 'none',
}

const getFirstAvailableVariant = (products: any) =>
  products.find((variant: any) => variant.node.availableForSale === true).node

export default function ProductOptions({
  product,
  setSelected,
}: {
  product: Product
  setSelected: any
}) {
  const [selectedOptions, setSelectedCurrent] = useState<any>({})

  // Select the first available item combination on props change
  useEffect(() => {
    const firstAvailableVariant = getFirstAvailableVariant(
      product.variants.edges
    )

    const selection = firstAvailableVariant?.selectedOptions.reduce(
      (acc: any, curr: any) => ({ ...acc, [curr.name]: curr.value }),
      {}
    )
    setSelectedCurrent(selection)
    // setSelected(selection)
  }, [product])

  const SelectOption = ({ name, value }: any) => {
    const firstKey = product.availableForSale && Object.keys(selectedOptions)[0]
    if (name !== firstKey) {
      setSelectedCurrent({ ...selectedOptions, [name]: value })
      setSelected({ ...selectedOptions, [name]: value })
      return
    }

    const filteredProducts = product.variants.edges.filter((variant) => {
      for (const option of variant.node.selectedOptions) {
        if (name === option.name && value === option.value) return true
        return false
      }
    })
    const firstAvailableVariant = getFirstAvailableVariant(filteredProducts)

    const selection = firstAvailableVariant?.selectedOptions.reduce(
      (acc: any, curr: any) => ({ ...acc, [curr.name]: curr.value }),
      {}
    )
    setSelectedCurrent(selection)
    setSelected(selection)
  }

  if (!product.availableForSale) return <></>

  const variantsByOption = ({ name, value }: any) =>
    product.variants.edges.filter((variant) => {
      for (const option of variant.node.selectedOptions) {
        if (name === option.name && value === option.value) return true
        return false
      }
    })

  const isOptionInStock = ({ name, value }: any) => {
    const variants = variantsByOption({ name, value })
    return (
      variants.filter((variant) => variant.node.availableForSale === true)
        .length > 0
    )
  }

  const isCombinationInStock = (secondOption: any) => {
    const title = `${Object.values(selectedOptions)[0]} / ${secondOption}`

    return product.variants.edges.filter(
      (variant) => variant.node.title === title
    )[0]?.node.availableForSale
  }

  return (
    <div className="flex flex-col pt-3 pb-5">
      {product &&
        product.options[0].name !== 'Title' &&
        product.options.map((option, index) => (
          <div key={option.id}>
            <span className="text-[16px] text-[#1E90FF]">{option.name}</span>
            <ul className="flex">
              {option.values &&
                option.values.map((value) => (
                  <li key={value} className="pr-2">
                    <Button
                      key={option.id + value}
                      className={
                        'h-[20px] w-[132px] border border-black text-center ' +
                        (Object.values(selectedOptions).includes(value)
                          ? ' bg-black text-white hover:opacity-100'
                          : ' bg-white text-black')
                      }
                      style={
                        index === 0
                          ? isOptionInStock({
                              name: option.name,
                              value: value,
                            })
                            ? {}
                            : notInStock
                          : isCombinationInStock(value)
                          ? {}
                          : notInStock
                      }
                      onClick={() => SelectOption({ name: option.name, value })}
                    >
                      {value}
                    </Button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
    </div>
  )
}
