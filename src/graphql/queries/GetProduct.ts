import { gql } from '@apollo/client/core'

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
      images(first: 10) {
        edges {
          node {
            height
            width
            altText
            url
            placeholder: url(transform: { maxWidth: 200, maxHeight: 200 })
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
