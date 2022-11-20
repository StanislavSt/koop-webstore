import { gql } from '@apollo/client'

const GetCollections = gql`
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          title
          handle
          metafields(first: 3) {
            edges {
              node {
                key
                id
                value
                type
              }
            }
          }
        }
      }
    }
  }
`

export default GetCollections
