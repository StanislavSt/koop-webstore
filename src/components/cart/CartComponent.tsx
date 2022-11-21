import { gql, useQuery } from '@apollo/client'

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`

export const Cart = () => {
  const { data, loading, error } = useQuery(GET_CART_ITEMS)

  if (loading) return <>Loading Cart</>
  if (error) return <p>ERROR: {error.message}</p>

  return (
    <>
      <h4>My Cart:</h4>
      {data && data.cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <p>{data.cartItems.length}</p>
      )}
    </>
  )
}
