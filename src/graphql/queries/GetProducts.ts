import { gql } from '@apollo/client'

const GetProducts = gql`
  query GetProducts($first: Int!) {
    products(first: $first, query: "status:active") {
      edges {
        node {
          id
          title
          handle
          tags
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
                metafields(first: 5) {
                  edges {
                    node {
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
  }
`

export default GetProducts
