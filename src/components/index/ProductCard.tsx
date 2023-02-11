import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { getArtists } from '../../utils/getArtist'
import { calculateImageHeight } from '../../utils/calculateImageHeight'
import { ProductWithAnimation } from '../../utils/createProductGrid'

type ImageState = ProductWithAnimation['images']['edges'][0]['node'] & {
  blurDataUrl?: string
}
const intervals: number[] = []

export const ProductCard = ({
  product,
  isRecommendedProduct,
}: {
  product: ProductWithAnimation
  isRecommendedProduct?: boolean
}) => {
  const { t } = useTranslation()

  const [image, setImage] = useState<ImageState>(product.images.edges[0].node)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const interval = useRef<any>()
  const artists = getArtists(product)

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
    <div
      className={`${
        product.animate
          ? 'duration-500 animate-in slide-in-from-bottom'
          : 'duration-500 animate-in fade-in'
      }`}
    >
      <div className="flex flex-row items-end justify-between md:flex-col md:items-start xl:flex-row xl:items-end">
        <span
          className={`${
            isRecommendedProduct ? 'text-md' : 'text-lg'
          } mb-1 leading-[18px] xl:max-w-[55%]`}
        >
          {product.title}
        </span>
        <p
          className={`${
            isRecommendedProduct ? 'text-md' : 'text-lg'
          } mt-1 mb-1 font-medium uppercase leading-[18px]`}
        >
          {t('bgn')}{' '}
          {Number(product.priceRange.minVariantPrice.amount).toFixed(2)}
        </p>
      </div>
      <Link href={`/product/${product.handle}`}>
        <Image
          className={`${
            images.length === 1 &&
            'transition-transform duration-200 hover:scale-110'
          } aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full cursor-pointer overflow-hidden rounded-lg`}
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
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
      </Link>
      {artists && (
        <div className="flex flex-col gap-1">
          {artists.map((artist) => (
            <Link key={artist.id} href={`/artist/${artist.handle}`}>
              <span
                className={` ${
                  isRecommendedProduct ? 'text-md' : 'text-lg'
                } max-w-fit cursor-pointer rounded-[4px] bg-black p-[0.35rem] pt-[0.45rem] uppercase leading-[15px] text-white hover:opacity-70`}
              >
                {artist.title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
