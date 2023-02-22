import { gql } from '@apollo/client/core'

const GetArtists = gql`
  query GetArtists($first: Int!, $language: LanguageCode)
  @inContext(language: $language) {
    collections(first: $first) {
      edges {
        node {
          handle
          title
          metafields(identifiers: [{ namespace: "custom", key: "artist" }]) {
            key
            value
          }
        }
      }
    }
  }
`

export default GetArtists
