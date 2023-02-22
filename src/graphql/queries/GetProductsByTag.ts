import { gql } from '@apollo/client/core'

const GetProductsByTag = gql`
  query GetProductsByTag(
    $first: Int!
    $after: String
    $productType: String!
    $tag: String
    $language: LanguageCode
  ) @inContext(language: $language) {
    collection(handle: "home-page-products") {
      products(
        first: $first
        after: $after
        filters: [{ productType: $productType }, { tag: $tag }]
      ) {
        edges {
          cursor
          node {
            id
            title
            handle
            tags
            productType
            availableForSale
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

export default GetProductsByTag
