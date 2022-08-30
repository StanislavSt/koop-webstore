import Layout from '../layout/Layout'
import Image from 'next/image'

const ProductPage = ({ post }: any) => {
  console.log(post)
  return (
    <Layout title={post[0].store.title}>
      <div className="m-10 w-7/12 flex-col my-10 mx-auto">
        <Image
          className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 group-hover:opacity-75"
          src={post[0].store.previewImageUrl}
          alt={post[0].store.previewImageUrl ?? ''}
          width={250}
          height={350}
          objectFit="cover"
        />
      </div>
    </Layout>
  )
}
export default ProductPage
