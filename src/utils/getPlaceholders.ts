import { ProductWithCursor } from '../pages'

const getPlaceholders = async (
  images: ProductWithCursor['images']['edges'][0]['node'][]
) =>
  await Promise.all(
    images.map(async (image) => {
      const blurDataURL = await fetch('/api/getBase64', {
        method: 'POST',
        body: JSON.stringify({
          url: image.placeholder,
        }),
      })

      return {
        ...image,
        blurDataUrl: await blurDataURL.json(),
      }
    })
  )

export default getPlaceholders
