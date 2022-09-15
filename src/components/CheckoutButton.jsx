/* eslint-disable @typescript-eslint/no-empty-function */
import * as MyPOSEmbedded from 'mypos-embedded-checkout'

const paymentParams = {
  sid: '000000000000010',
  ipcLanguage: 'en', //Checkout page language (ISO 2 format).
  walletNumber: '61938166610',
  amount: 23.45,
  currency: 'EUR',
  orderID: Math.random().toString(36).substr(2, 9),
  urlNotify: MyPOSEmbedded.IPC_URL + '/client/ipcNotify', // Warning: use your own url to verify your payment!
  urlOk: window.location.href,
  urlCancel: window.location.href,
  keyIndex: 1,
  CustomerAddress: 'Some address',
  CustomerEmail: 's.staev1@gmail.com',
  cartItems: [
    {
      article: 'HP ProBook 6360b sticker',
      quantity: 2,
      price: 10,
      currency: 'EUR',
    },
    {
      article: 'Delivery',
      quantity: 1,
      price: 3.45,
      currency: 'EUR',
    },
  ],
}

const callbackParams = {
  isSandbox: true,
  onSuccess: () => {},
  onError: () => {},
}

export default function CheckoutButton() {
  return (
    <>
      <div id="embeddedCheckout"></div>
      <button
        onClick={() =>
          MyPOSEmbedded.createPayment(
            'embeddedCheckout',
            paymentParams,
            callbackParams
          )
        }
      >
        Checkout
      </button>
    </>
  )
}
