import { gql } from '@apollo/client/core'

const GetAnnouncement = gql`
  query GetAnnouncement($collectionId: ID!, $language: LanguageCode)
  @inContext(language: $language) {
    collection(id: $collectionId) {
      title
      image {
        id
        src
        height
        width
        altText
      }
      descriptionHtml
      metafields(
        identifiers: [
          { namespace: "custom", key: "announcement_end_date" }
          { namespace: "custom", key: "announcement_start_date" }
        ]
      ) {
        key
        value
      }
      products(first: 50) {
        edges {
          cursor
          node {
            id
            title
            handle
            tags
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

export default GetAnnouncement
