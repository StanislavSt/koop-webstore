import { gql } from '@apollo/client'

const GetCollections = gql`
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          title
          handle
          metafields(identifiers: [{ namespace: "custom", key: "artist" }]) {
            key
            value
          }
        }
      }
    }
  }
`

export default GetCollections
