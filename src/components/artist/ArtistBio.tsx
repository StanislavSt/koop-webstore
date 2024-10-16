import Image from 'next/image'

import { GetArtistQuery } from '../../graphql/types'
import { calculateImageHeight } from '../../utils/calculateImageHeight'

const ArtistBio = ({
  artist,
}: {
  artist: GetArtistQuery['collectionByHandle']
}) => {
  return (
    <div className="inline-flex flex-col items-center gap-10 p-4 sm:flex-row sm:items-start">
      {artist?.image?.url && (
        <Image
          className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full cursor-pointer overflow-hidden rounded-lg"
          src={artist?.image?.url}
          alt={artist?.image?.altText ?? ''}
          width={500}
          height={calculateImageHeight(
            artist?.image?.width ?? 0,
            artist?.image?.height ?? 0,
            500
          )}
          objectFit="contain"
        />
      )}
      {artist && (
        <div
          className="sm:max-w-[400px]"
          dangerouslySetInnerHTML={{ __html: artist.descriptionHtml }}
        />
      )}
    </div>
  )
}

export default ArtistBio
