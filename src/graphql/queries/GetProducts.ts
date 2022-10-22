import { gql } from '@apollo/client'

const GetProducts = gql`
  query GetProducts($first: Int!) {
    products(first: $first) {
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
        }
      }
    }
  }
`

export default GetProducts
