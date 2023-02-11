import React, { Dispatch, SetStateAction, useState } from 'react'
import { Product } from '../../graphql/types'
import { Button } from '../common'

export default function ProductOptions({
  product,
  setSelectedOptions,
}: {
  product: Product
  setSelectedOptions: Dispatch<SetStateAction<{ [key: string]: string }>>
}) {
  const selectedInit: { [key: string]: string } = {}
  const [selectedOptions, setSelected] = useState(selectedInit)
  return (
    <div className="flex flex-col pt-6">
      {product &&
        product.options[0].name !== 'Title' &&
        product.options.map((option) => (
          <div key={option.id}>
            <span className="text-[16px] text-[#1E90FF]">{option.name}</span>
            <ul className="flex">
              {option.values &&
                option.values.map((value) => (
                  <li key={value} className="pr-2">
                    <Button
                      key={option.id + value}
                      className={
                        'h-[20px] w-[132px] border border-black text-center' +
                        (Object.values(selectedOptions).includes(value)
                          ? ' bg-black text-white'
                          : ' bg-white text-black')
                      }
                      onClick={() => {
                        setSelectedOptions({
                          ...selectedOptions,
                          [option.name]: value,
                        })
                        setSelected({
                          ...selectedOptions,
                          [option.name]: value,
                        })
                      }}
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
