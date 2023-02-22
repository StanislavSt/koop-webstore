import { gql } from '@apollo/client/core'

const GetPage = gql`
  query GetPage($handle: String!, $language: LanguageCode)
  @inContext(language: $language) {
    page(handle: $handle) {
      body
    }
  }
`

export default GetPage
