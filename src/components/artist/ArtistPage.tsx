import { GetArtistQuery } from '../../graphql/types'
import Layout from '../layout/Layout'

const ArtistPage = ({
  artist,
}: {
  artist: GetArtistQuery['collectionByHandle']
}) => (
  <Layout title="Artist page">
    <div> This is the artist page of : {artist?.title}</div>
  </Layout>
)
export default ArtistPage
