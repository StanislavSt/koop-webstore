/* eslint-disable @typescript-eslint/no-empty-function */
import * as MyPOSEmbedded from 'mypos-embedded-checkout'

const paymentParams = {
  sid: '458570',
  ipcLanguage: 'en', //Checkout page language (ISO 2 format).
  walletNumber: '40609591967',
  amount: 0.1,
  currency: 'EUR',
  orderID: Math.random().toString(36).substr(2, 9),
  urlNotify: 'https://koop-webstore.vercel.app/' + 'notify', // Warning: use your own url to verify your payment!
  urlOk: window.location.href,
  urlCancel: window.location.href,
  keyIndex: 1,
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
  //   isSandbox: true,
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
