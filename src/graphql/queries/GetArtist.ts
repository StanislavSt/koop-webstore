import { gql } from '@apollo/client'

const GetArtist = gql`
  query GetArtist(
    $artistHandle: String!
    $numberOfProductsToQuery: Int!
    $after: String
    $language: LanguageCode
  ) @inContext(language: $language) {
    collectionByHandle(handle: $artistHandle) {
      title
      handle
      descriptionHtml
      image {
        url
        width
        height
        altText
      }
      products(first: $numberOfProductsToQuery, after: $after) {
        edges {
          cursor
          node {
            id
            title
            handle
            tags
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 10) {
              edges {
                node {
                  height
                  width
                  altText
                  placeholder: url(transform: { maxWidth: 100, maxHeight: 100 })
                  url
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
            collections(first: 5) {
              edges {
                node {
                  id
                  handle
                  title
                  metafields(
                    identifiers: [{ namespace: "custom", key: "artist" }]
                  ) {
                    key
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default GetArtist
