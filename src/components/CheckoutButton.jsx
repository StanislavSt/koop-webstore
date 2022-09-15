/* eslint-disable @typescript-eslint/no-empty-function */
import * as MyPOSEmbedded from 'mypos-embedded-checkout'

const paymentParams = {
  sid: '458570',
  ipcLanguage: 'en', //Checkout page language (ISO 2 format).
  walletNumber: '40609591967',
  amount: 0.1,
  currency: 'BGN',
  orderID: Math.random().toString(36).substr(2, 9),
  urlNotify: 'https://koop-webstore.vercel.app/api/notify', // Warning: use your own url to verify your payment!
  urlOk: 'https://koop-webstore.vercel.app/',
  urlCancel: 'https://koop-webstore.vercel.app/',
  keyIndex: 1,
  CardTokenRequest: 0,
  CustomerAddress: 'Samokov 28g',
  CustomerZIPCode: '1113',
  PaymentParametersRequired: 2,
  cartItems: [
    {
      article: 'HP ProBook 6360b sticker',
      quantity: 1,
      price: 0.05,
      currency: 'BGN',
    },
    {
      article: 'Delivery',
      quantity: 1,
      price: 0.05,
      currency: 'BGN',
    },
  ],
  signature:
    'eyJzaWQiOiI0NTg1NzAiLCJjbiI6IjQwNjA5NTkxOTY3IiwicGsiOiItLS0tLUJFR0lOIFJTQSBQUklWQVRFIEtFWS0tLS0tXG5NSUlDWFFJQkFBS0JnUURCTTFKZ1B2Ujgwb1lxdEtoSGtWS2lJbjFcL1JWeElUQUdPU0JLUk5TMlNoNjY3SkxiWVxuakxjTlEwZFZha29MNGNma005aWVrUWdOZ21pZllNTlFcL0RrZmFnOGhIWFlcL2xLakJkTXhNaStHZXZUenl0NHdGXG5UV2p1UklmSEZubm5mRkZacjBDTDE1NDR2cDlzSWJaWkJXeHp5dm5PakgrVFZLbEtWR2xTdk1HVXJRSURBUUFCXG5Bb0dBR3A5KzM0SnRZSElHU1FaQ0ZqS2haM1JIUk8yQzdQZUVVMTM5S1FOaDkwbzVPdEt4VzVcL3diYVJ5eFFOelxubHJXVFBSQWo3cDNmdFRUZVFcL0FxbWhOWHI0MzBZQmQrYXhoVXJxSG5vSmtcLzhiaitvdEphUXVcL0s2aG9KSjVqWFxuME0zMUI0YnRsSEgzTHhrZWdsQWdTN3pDcmZxejl2c3ZHQk1pOGtSXC8xUTQ1VGlFQ1FRRDByUFByODVGYXBuMWdcbnB6Y2swYVlkVEtuRzVnYVdtSjZtRzFOTWdWRFgreXhnUXBBRzRFSmVVWHl2T1FUSFRtaFFia3oyWnN3WVZKcHdcbmZWRlBCS0laQWtFQXlpUjIxNVIzTm1wRmVybCtRc3FiZXBpQUJLaXVBbHkzT2xMazFnajducVRFMmc3N0xTS0JcbnVISWZPTkNkcU1aS1hwRjN6VzE0bjVuSVwvakpSZW52aHRRSkJBTThXZDVsMFhNbFo4dkpVZFRMZmt2Wm5oYWNIXG4xXC9tc2tWTEwrXC9QYjI3NENKQ3dSQ25BWGJYVUJDVVFSUVg4aldOMENqbmRheUZHcmdjXC9GOFlTc3lqa0NRRnpJXG5LZWdcL2xBeGM4UEVvclFSNVBLNGp5emJZT2E2SjRld2FXa0RIdEw2WGdHZGFVdjNmaGMwa1RLSm1Wc2M5NUtyTlxuZUVESlM0RnVNK3hCS2xiZVwvN1VDUVFDbml2MVA4YWIxQmpQY05zRWFSd2J5REVPZW13VUVhNkZ2dWhHNUlXZ0NcbmVYVFJCT3dMU1g2T0dKajRGd2I5N0trMCtMWnVDUXdkMk96dVdpRFNqWnRPXG4tLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLVxuIiwicGMiOiItLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS1cbk1JSUNEVENDQVhhZ0F3SUJBZ0lFYnBwRlFUQU5CZ2txaGtpRzl3MEJBUXNGQURBZE1Rc3dDUVlEVlFRR0V3SkNcblJ6RU9NQXdHQTFVRUNoTUZiWGxRVDFNd0hoY05Nakl3T1RFMU1Ea3hNekUxV2hjTk16SXdPVEV5TURreE16RTFcbldqQWRNUXN3Q1FZRFZRUUdFd0pDUnpFT01Bd0dBMVVFQ2hNRmJYbFFUMU13Z1o4d0RRWUpLb1pJaHZjTkFRRUJcbkJRQURnWTBBTUlHSkFvR0JBTWhPQ0s0dEFXSUo0bVN1MU1XcFhmcTBmSzRybzdIZll4OGpEQVZBQll2S2FnYWZcbmhLZEE1M2J3bDdPRUFNS25YU1p4YVdzNjJUSUlLb2VCXC9XNmtFMHFLZGRDeWVZUWoyQVwvcDNrY2pIa3V0RlA3T1xuOVFUSGs0WGZ5YUZHUFBVb2ZKU0NWaGJGU0FEdFpEMXVKdHVkMzhNdE1ZUVlQZmlMV25aamR3V1cwclhSQWdNQlxuQUFHaldqQllNQjBHQTFVZERnUVdCQlFGZ0QwMldCc2VibmJCb3lKTU9pRkdOVWw5ZmpBZkJnTlZIU01FR0RBV1xuZ0JRRmdEMDJXQnNlYm5iQm95Sk1PaUZHTlVsOWZqQUpCZ05WSFJNRUFqQUFNQXNHQTFVZER3UUVBd0lFOERBTlxuQmdrcWhraUc5dzBCQVFzRkFBT0JnUUNcLzNZWVgxSnpXR0dWaVo3NXZ2am9nN1hGNXpqOEltd1RvXC9cL295MzIyblxuSTQzdTcxQzhtZTBGYk53RGpIT0I3NWxYZ0FvblN1Uk9FZ1NYMHVCZFB5bWdXbTlCSm9UXC92aGpidlZSY29sRlVcbmt1dlwvaW5WNVcrTk9ZeG9YakphSnEycnNKZVVSN1cxMDcxRU5Pc3dCQWRkT1lTNVNhNklIYkhJZTJjTU5hN3BBXG5uZz09XG4tLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tXG4iLCJpZHgiOiIxIn0=',
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
