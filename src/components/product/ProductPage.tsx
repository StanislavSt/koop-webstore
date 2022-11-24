import { GetProductQuery } from '../../graphql/types'
import Layout from '../layout/Layout'
import { cartItemsVar } from '../../graphql/cache'
import { useReactiveVar } from '@apollo/client'
import { useState } from 'react'
const ProductPage = ({
  product,
}: {
  product: GetProductQuery['productByHandle']
}) => {
  let selectedInit: {[key: string]: string} = {};
  let [selected, setSelected] = useState(selectedInit)
  const CartItemsVar = useReactiveVar(cartItemsVar)
  const firstImage = product?.images.edges[0].node
  return (
    <Layout title="Product page">
      <div className="bg-white">
        <div className="max-w-xs mx-auto py-5 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-15"></div>
        <div className="px-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">

          <div className='py-5'>

            <h1 className='px-5 py-5'>{product?.title}</h1>
            <img className='px-5 py-5' src={firstImage?.url} alt={firstImage?.altText || ''} />
          </div>

          <div className='py-5'>
            <button
              onClick={() => {
                if (!product) return
                cartItemsVar([
                  ...CartItemsVar,
                  { variantId: product.variants.edges[0].node.id, quantity: 1 },
                ])
              }}
            >
              Add to Cart
            </button>
            <div>
              {product && product.options.map(option => (
                <div>
                  <h3 className='bg-black text-white'> {option.name}</h3>
                  <ul>
                    {option.values.map(value => (
                      <li>
                        <button 
                          onClick={()=> {
                            setSelected({
                              ...selected,
                              [option.name]: value
                            })
                          }}
                        >{value}</button>
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
