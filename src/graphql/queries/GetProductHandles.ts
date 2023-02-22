import { gql } from '@apollo/client/core'

const GetProductHandles = gql`
  query GetProductHandles($first: Int!) {
    products(first: $first, query: "status:active") {
      edges {
        node {
          handle
        }
      }
    }
  }
`

export default GetProductHandles
