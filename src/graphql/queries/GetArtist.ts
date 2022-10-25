import { gql } from '@apollo/client'

const GetArtist = gql`
  query GetArtist($artistHandle: String!) {
    collectionByHandle(handle: $artistHandle) {
      title
      handle
      products(first: 5) {
        nodes {
          title
          priceRangeV2 {
            minVariantPrice {
              amount
            }
          }
          bg: translations(locale: "bg") {
            key
            locale
            value
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
      metafields(first: 10) {
        edges {
          node {
            key
            id
            value
            type
          }
        }
      }
    }
  }
`

export default GetArtist
