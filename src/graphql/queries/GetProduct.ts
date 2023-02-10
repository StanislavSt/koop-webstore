import { gql } from '@apollo/client'

const GetProduct = gql`
  query GetProduct($productHandle: String!, $language: LanguageCode)
  @inContext(language: $language) {
    product(handle: $productHandle) {
      id
      title
      handle
      tags
      availableForSale
      descriptionHtml
      productType
      priceRange {
        minVariantPrice {
          amount
        }
      }
      images(first: 5) {
        edges {
          node {
            height
            width
            altText
            url
          }
        }
      }
      options {
        name
        values
        id
      }
      metafields(identifiers: [{ namespace: "custom", key: "material" }]) {
        key
        value
      }
      collections(first: 5) {
        edges {
          node {
            id
            handle
            title
            metafields(identifiers: [{ namespace: "custom", key: "artist" }]) {
              key
              value
            }
          }
        }
      }
      variants(first: 30) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            price {
              amount
            }
            id
            title
            availableForSale
            quantityAvailable
          }
        }
      }
    }
  }
`

export default GetProduct
