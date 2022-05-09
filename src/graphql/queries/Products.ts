import { gql } from '@apollo/client'

const Products = gql`
  query Products {
    products(first: 5) {
      edges {
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
