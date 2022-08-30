import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Layout from '../layout/Layout'

const IndexPage = ({ post }: any) => {
  const { locale } = useRouter()
  return (
    <Layout title="Home Page">
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {post.map((x: any) => (
              <a key={x.id} className="group">
                <Link href={`product/${x.store.slug.current}`}>
                  {x.store.previewImageUrl && (
                    <Image
                      className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 group-hover:opacity-75"
                      src={x.store.previewImageUrl}
                      alt={x.store.previewImageUrl ?? ''}
                      width={250}
                      height={350}
                      objectFit="cover"
                    />
                  )}
                </Link>
                <h3 className="mt-4 text-sm text-gray-700">
                  {locale === 'bg' ? x.title && x.title.titleBg : x.store.title}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {x.store.priceRange.minVariantPrice}€
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
