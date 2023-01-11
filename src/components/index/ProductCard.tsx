import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { getArtistName } from '../../utils/getArtist'
import { calculateImageHeight } from '../../utils/calculateImageHeight'
import { ProductWithAnimation } from '../../utils/createProductGrid'

export const ProductCard = ({ product }: { product: ProductWithAnimation }) => {
  const { t } = useTranslation()

  return (
    <Link href={`product/${product.handle}`}>
      <div
        className={`group ${
          product.animate
            ? 'animate-in slide-in-from-bottom duration-500'
            : 'animate-in fade-in duration-500'
        }`}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg text-gray-700 max-w-[75%]">{product.title}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900 uppercase">
            {t('bgn')} {product.priceRange.minVariantPrice.amount}
          </p>
        </div>
        <Image
          className="overflow-hidden w-full rounded-lg group-hover:opacity-60 aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8"
          src={product.images.edges[0].node.url}
          alt={product.images.edges[0].node.altText ?? ''}
          width={500}
          height={calculateImageHeight(
            product.images.edges[0].node.width ?? 0,
            product.images.edges[0].node.height ?? 0,
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
