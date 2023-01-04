import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { getArtistName } from '../../utils/getArtist'
import { ProductWithCoverImage } from '../../pages'

export const ProductCard = ({
  product,
}: {
  product: ProductWithCoverImage
}) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  const getHeight = (
    originalWidth: number,
    originalHeight: number,
    currentWidth: number
  ) => {
    const ratio = originalHeight / originalWidth
    return currentWidth * ratio
  }

  return (
    <Link href={`product/${product.handle}`}>
      <a className="group">
        <div className="flex justify-between items-center">
          <h3 className="text-lg text-gray-700 max-w-[75%]">
            {locale === 'bg'
              ? product.bg[0] && product.bg[0].value
              : product.title}
          </h3>
          <p className="mt-1 text-lg font-medium text-gray-900 uppercase">
            {t('bgn')} {product.priceRangeV2.minVariantPrice.amount}
          </p>
        </div>
        <Image
          className="overflow-hidden w-full rounded-lg group-hover:opacity-75 aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8"
          src={product.images.edges[0].node.url}
          alt={product.images.edges[0].node.altText ?? ''}
          width={500}
          height={getHeight(
            product.coverImage.size.width,
            product.coverImage.size.height,
            500
          )}
          objectFit="contain"
        />
        {getArtistName(product) && (
          <span className="text-white uppercase bg-black rounded-[4px] leading-[23px] p-[0.35rem]">
            {getArtistName(product)}
          </span>
        )}
      </a>
    </Link>
  )
}
