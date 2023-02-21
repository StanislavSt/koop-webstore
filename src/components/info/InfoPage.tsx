import { useRouter } from 'next/router'

import { CollectionEdge, Page } from '../../graphql/types'
import Layout from '../layout/Layout'
import InfoNavigation from './InfoNavigation'
import ArtistsSection from './ArtistsSection'

const TextContent = ({ html }: { html: string }) => (
  <div
    className="mt-10 md:max-w-[800px]"
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

const InfoPage = ({
  page,
  artists,
}: {
  page: Page
  artists: CollectionEdge[]
}) => {
  const router = useRouter()
  const title = router.locale === 'bg' ? 'Инфо' : 'Info'
  return (
    <Layout title={title}>
      <div className="flex justify-between px-3 md:gap-[10%] lg:gap-[20%] xl:gap-[30%]">
        <div className="md:min-w-[300px] lg:min-w-[400px] xl:min-w-[500px]">
          <InfoNavigation />
          <TextContent html={page?.body} />
          {router.query.handle === `artists` && (
            <div className="block md:hidden">
              <ArtistsSection artists={artists} />
            </div>
          )}
        </div>
        <div className="hidden md:block">
          <ArtistsSection artists={artists} />
        </div>
      </div>
    </Layout>
  )
}

export default InfoPage
