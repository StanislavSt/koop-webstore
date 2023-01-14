import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { getArtistName } from '../../utils/getArtist'
import { calculateImageHeight } from '../../utils/calculateImageHeight'
import { ProductWithAnimation } from '../../utils/createProductGrid'
import { useRef, useState } from 'react'

type ImageState = ProductWithAnimation['images']['edges'][0]['node'] & {
  blurDataUrl?: string
}
const intervals: number[] = []

export const ProductCard = ({ product }: { product: ProductWithAnimation }) => {
  const { t } = useTranslation()

  const [image, setImage] = useState<ImageState>(product.images.edges[0].node)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const interval = useRef<any>()

  const images = product.images.edges.map((edge) => edge.node)

  let counter = 0

  const handleOnMouseEnter = async () => {
    if (images.length === 1) return

    clearInterval(interval.current)

    interval.current = setInterval(function () {
      setImage(images[counter])
      counter++
      if (counter > images.length - 1) counter = 0
    }, 200)
    intervals.push(interval.current)
  }

  const handleOnMouseLeave = async () => {
    setImage(images[0])
    clearInterval(interval.current)
    intervals.forEach((interval) => clearInterval(interval))
  }

  return (
    <Link href={`product/${product.handle}`}>
      <div
        className={`cursor-pointer ${
          product.animate
            ? 'animate-in slide-in-from-bottom duration-500'
            : 'animate-in fade-in duration-500'
        }`}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg text-gray-700 max-w-[75%]">{product.title}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900 uppercase">
            {t('bgn')} {product.priceRange.minVariantPrice.amount}
          </p>
        </div>
        <Image
          className="overflow-hidden w-full rounded-lg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8"
          src={image.url}
          alt={image.altText ?? ''}
          width={500}
          height={calculateImageHeight(
            image.width ?? 0,
            image.height ?? 0,
            500
          )}
          placeholder={product.blurDataUrl ? 'blur' : 'empty'}
          blurDataURL={product.blurDataUrl}
          objectFit="contain"
        />
        {getArtistName(product) && (
          <span className="text-white uppercase bg-black rounded-[4px] leading-[23px] p-[0.35rem]">
            {getArtistName(product)}
          </span>
        )}
      </div>
    </Link>
  )
}
