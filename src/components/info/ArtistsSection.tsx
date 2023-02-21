import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { CollectionEdge } from '../../graphql/types'

const ArtistsSection = ({ artists }: { artists: CollectionEdge[] }) => {
  const { t } = useTranslation()
  return (
    <section className="md:sticky md:top-5">
      <span className="hidden text-[#1E90FF] md:block">
        {' '}
        {t('authors and publishers')}
      </span>
      <div className="flex flex-wrap gap-5">
        {artists.map((artist) => (
          <Link key={artist.node.id} href={`/artist/${artist.node.handle}`}>
            <a className="max-w-fit cursor-pointer rounded-[4px] bg-black p-[0.35rem] pt-[0.45rem] uppercase leading-[15px] text-white hover:opacity-70">
              {artist.node.title}
            </a>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ArtistsSection
