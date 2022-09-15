import Layout from '../layout/Layout'
import Image from 'next/image'
import dynamic from 'next/dynamic'
// import parse from 'html-react-parser'
// import { useState } from 'react'

const CheckoutButton = dynamic(() => import('../CheckoutButton'), {
  ssr: false,
})

// const fetcher = (url: string) => fetch(url).then((res) => res.json())

const ProductPage = ({ products }) => {
  const product = products[0]
  // const { data, error } = useSwr<any>(`/api/purchase`, fetcher)
  // console.log('this is api', data)

  // const [htmlstring, sethtmlstring] = useState('<div></div>')
  return (
    <Layout title={product.store.title}>
      <div className="m-10 w-7/12 flex-col my-10 mx-auto">
        <Image
          className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 group-hover:opacity-75"
          src={product.store.previewImageUrl}
          alt={product.store.previewImageUrl ?? ''}
          width={250}
          height={350}
          objectFit="cover"
        />
        <CheckoutButton />
        <button onClick={() => fetch('/api/purchase', { method: 'POST' })}>
          {' '}
          click me
        </button>
      </div>
    </Layout>
  )
}
export default ProductPage
