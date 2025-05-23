import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import useMediaQuery from 'beautiful-react-hooks/useMediaQuery'

import { getArtists } from '../../utils/getArtist'
import { calculateImageHeight } from '../../utils/calculateImageHeight'
import { ProductWithAnimation } from '../../utils/createProductGrid'

type ImageState = ProductWithAnimation['images']['edges'][0]['node'] & {
  blurDataUrl?: string
}
const intervals: number[] = []

const ProductCard = ({
  product,
  isRecommendedProduct,
}: {
  product: ProductWithAnimation
  isRecommendedProduct?: boolean
}) => {
  const { t, i18n } = useTranslation()
  const isLarge = useMediaQuery('(min-width: 48rem)')

  const [image, setImage] = useState<ImageState>(
    product?.images.edges[0].node ?? null
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const interval = useRef<any>()
  const artists = getArtists(product)

  const images = product?.images.edges.map((edge) => edge.node)

  let counter = 0

  const handleOnMouseEnter = async () => {
    if (images.length === 1) return
    if (product.productType === 'prints') return

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
  if (!product) return <></>
  return (
    <div
      className={`${
        product?.animate
          ? 'duration-500 animate-in slide-in-from-bottom'
          : 'duration-500 animate-in fade-in'
      }`}
    >
      <div className="group">
        <div className="flex flex-row items-end justify-between md:flex-col md:items-start xl:flex-row xl:items-end">
          <span
            className={`${
              isRecommendedProduct ? 'text-md' : 'text-lg'
            } mb-1 leading-[18px] xl:max-w-[55%]`}
          >
            {product.title}
          </span>
          <p
            className={`${isRecommendedProduct ? 'text-md' : 'text-lg'} ${
              product.availableForSale ? '' : 'line-through'
            } mb-1 mt-1 font-medium uppercase leading-[18px]`}
          >
            {i18n.language === 'en' && t('bgn')}{' '}
            {Number(product.priceRange.minVariantPrice.amount).toFixed(2)}{' '}
            {i18n.language === 'bg' && t('bgn')}
          </p>
        </div>
        <Link href={`/product/${product.handle}`} legacyBehavior>
          <a aria-label={product.title}>
            <Image
              className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full cursor-pointer overflow-hidden rounded-lg"
              src={image.url}
              alt={image.altText ?? ''}
              width={375}
              height={calculateImageHeight(
                image.width ?? 0,
                image.height ?? 0,
                375
              )}
              placeholder={product.blurDataUrl ? 'blur' : 'empty'}
              blurDataURL={product.blurDataUrl}
              objectFit="contain"
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
              quality={isLarge ? 35 : 70}
            />
          </a>
        </Link>
        {isLarge &&
          product.images.edges
            .slice(1, product.images.edges.length)
            .map((edge, index) => (
              <Link
                href={`/product/${product.handle}`}
                key={index}
                legacyBehavior
              >
                <a aria-label={product.title} className="hidden">
                  <Image
                    className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full cursor-pointer overflow-hidden rounded-lg"
                    src={edge.node.url}
                    alt={edge.node.altText ?? ''}
                    width={375}
                    height={calculateImageHeight(
                      edge.node.width ?? 0,
                      edge.node.height ?? 0,
                      375
                    )}
                    objectFit="contain"
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                    quality={35}
                    priority
                  />
                </a>
              </Link>
            ))}
        <div className="mt-[-12px] hidden h-4 w-full rounded-lg bg-[#1E90FF] group-hover:block"></div>
        <div className="mt-[-12px] block h-4 w-full rounded-lg group-hover:hidden"></div>
      </div>
      {artists && (
        <div className="mt-1 flex flex-col gap-1">
          {artists.map((artist) => (
            <Link
              key={artist.id}
              href={`/artist/${artist.handle}`}
              legacyBehavior
            >
              <a
                className={` ${
                  isRecommendedProduct ? 'text-md' : 'text-lg'
                } max-w-fit cursor-pointer rounded-[4px] bg-black p-[0.35rem] pt-[0.45rem] uppercase leading-[15px] text-white hover:opacity-70`}
              >
                {artist.title}
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductCard
