import { gql } from '@apollo/client'

const GetProducts = gql`
  query GetProducts($first: Int, $after: String, $language: LanguageCode)
  @inContext(language: $language) {
    collection(handle: "home-page-products") {
      products(first: $first, after: $after) {
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

export default GetProducts
