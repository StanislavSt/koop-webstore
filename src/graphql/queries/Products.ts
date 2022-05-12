import { gql } from '@apollo/client'

const Products = gql`
  query Products {
    products(first: 10) {
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

export default Products
