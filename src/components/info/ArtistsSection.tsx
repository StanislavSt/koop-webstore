import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { CollectionEdge } from '../../graphql/types'
import { Button } from '../common'

const ArtistsSection = ({ artists }: { artists: CollectionEdge[] }) => {
  const { t } = useTranslation()
  return (
    <section className="md:sticky md:top-5">
      <span className="text-[#1E90FF] hidden md:block"> {t('artists')}</span>
      <div className="flex flex-wrap gap-5">
        {artists.map((artist) => (
          <Link key={artist.node.handle} href={`/artist/${artist.node.handle}`}>
            <Button
              className={`bg-[black] hover:bg-[#1E90FF] text-white px-3 py-4 flex items-center min-w-0 text-left text-xl rounded-[8px]`}
            >
              <span className="leading-[17px]">{artist.node.title}</span>
            </Button>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ArtistsSection
