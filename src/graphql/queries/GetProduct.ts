import { gql } from '@apollo/client'

const GetProduct = gql`
  query GetProduct($productHandle: String!) {
    productByHandle(handle: $productHandle) {
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
`

export default GetProduct
