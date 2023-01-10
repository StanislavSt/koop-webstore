import { gql } from '@apollo/client'

const GetProductRecommendations = gql`
  query GetProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      id
      title
      handle
      featuredImage {
        id
        width
        height
        altText
        url
      }
    }
  }
`

export default GetProductRecommendations
