import { gql } from '@apollo/client'

const GetProductsByTag = gql`
  query GetProductsByTag(
    $first: Int!
    $after: String
    $query: String
    $language: LanguageCode
  ) @inContext(language: $language) {
    products(first: $first, after: $after, query: $query) {
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
`

export default GetProductsByTag
