import { gql } from '@apollo/client'

const GetProductsByTag = gql`
  query GetProductsByTag($first: Int!, $query: String!) {
    products(first: $first, query: $query) {
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
          images(first: 1) {
            edges {
              node {
                height
                width
                altText
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
