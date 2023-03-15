import { ImageResponse } from '@vercel/og'
import { NextApiHandler } from 'next'
import { BackgroundCanvas } from '../../components/common/BackgroundCanvas'
import { ProfileContent } from '../../components/common/ProfileContent'

export const config = {
  runtime: 'experimental-edge',
}

const handler: NextApiHandler = async (req) => {
  if (!req.url) return
  const { searchParams } = new URL(req.url)

  const hasImageUrl = searchParams.has('imageUrl')
  const imageUrl = hasImageUrl ? searchParams.get('imageUrl') : undefined

  const hasTitle = searchParams.has('title')
  const title = hasTitle ? searchParams.get('title') : undefined

  const hasAuthor = searchParams.has('author')
  const author = hasAuthor ? searchParams.get('author') : undefined

  try {
    return new ImageResponse(
      (
        <BackgroundCanvas>
          <ProfileContent image={imageUrl} title={title} author={author} />
        </BackgroundCanvas>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch {
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}

export default handler
