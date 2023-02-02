import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { CollectionEdge } from '../../graphql/types'

const ArtistsSection = ({ artists }: { artists: CollectionEdge[] }) => {
  const { t } = useTranslation()
  return (
    <section className="md:sticky md:top-5">
      <span className="text-[#1E90FF] hidden md:block"> {t('artists')}</span>
      <div className="flex flex-wrap gap-5">
        {artists.map((artist) => (
          <Link key={artist.node.id} href={`/artist/${artist.node.handle}`}>
            <span className="text-white uppercase bg-black cursor-pointer hover:opacity-70 max-w-fit rounded-[4px] leading-[15px] p-[0.35rem] pt-[0.45rem]">
              {artist.node.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ArtistsSection
