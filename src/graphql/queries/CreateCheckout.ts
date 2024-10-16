import { gql } from '@apollo/client/core'

const CreateCheckout = gql`
  mutation CheckoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

export default CreateCheckout
