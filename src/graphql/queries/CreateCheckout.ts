import { gql } from '@apollo/client'

/**
 * Generates cart using the Storefront API
 * @param CheckoutCreateInput {
 *           input: {
 *             lineItems: [
 *                {
 *                 variantId: "gid://shopify/ProductVariant/40326411059336",
 *                  quantity: 1
 *                 }
 *               ]
 *           }
 */

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
