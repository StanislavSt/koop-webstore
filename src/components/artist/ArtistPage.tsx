import { GetArtistQuery } from '../../graphql/types'
import { ProductWithCursor } from '../../pages'
import Layout from '../layout/Layout'
import ArtistBio from './ArtistBio'
import ArtistProducts from './ArtistProducts'

const ArtistPage = ({
  artist,
  products,
}: {
  artist: GetArtistQuery['collectionByHandle']
  products: ProductWithCursor[]
}) => {
  if (!artist) return

  return (
    <Layout title={artist.title}>
      <ArtistBio artist={artist} />
      <ArtistProducts products={products} artistHandle={artist.handle} />
    </Layout>
  )
}
export default ArtistPage
