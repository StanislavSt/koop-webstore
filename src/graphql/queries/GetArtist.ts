import { gql } from '@apollo/client'

const GetArtist = gql`
  query GetArtist($artistHandle: String!) {
    collectionByHandle(handle: $artistHandle) {
      title
      handle
      products(first: 5) {
        nodes {
          title
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                altText
                url
              }
            }
          }
          description
        }
      }
    }
  }
`

export default GetArtist
