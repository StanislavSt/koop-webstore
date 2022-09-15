import * as mypos from '@mypos-ltd/mypos'
import { uuid } from 'uuidv4'

const x = mypos({
  isSandbox: true,
  logLevel: 'debug', // Logging level
  checkout: {
    // Checkout API specific configuration
    sid: '000000000000010', // Stored ID
    lang: 'EN', // Preferred language
    currency: 'EUR', // Store currency
    clientNumber: '61938166610', // Available in the myPOS Account
    okUrl: 'www.google.com', // Redirect URL on successful operation
    cancelUrl: 'www.google.com', // Redirect URL on cancelled operation
    notifyUtr: 'www.google.com', // Callback URL to be notified on operation result
    cardTokenRequest: 0, // View details at https://developers.mypos.eu/en/doc/online_payments/v1_4/21-purchase-with-payment-card-(api-call--ipcpurchase)
    paymentMethod: 1, // View details at https://developers.mypos.eu/en/doc/online_payments/v1_4/21-purchase-with-payment-card-(api-call--ipcpurchase)
    paymentParametersRequired: 3, // https://developers.mypos.eu/en/doc/online_payments/v1_4/21-purchase-with-payment-card-(api-call--ipcpurchase)
    keyIndex: 0, // Key index for the particular store
    privateKey:
      '-----BEGIN RSA PRIVATE KEY-----\n' + // The private key for the particular store in PEM format
      'MIICXAIBAAKBgQCf0TdcTuphb7X+Zwekt1XKEWZDczSGecfo6vQfqvraf5VPzcnJ\n' +
      '2Mc5J72HBm0u98EJHan+nle2WOZMVGItTa/2k1FRWwbt7iQ5dzDh5PEeZASg2UWe\n' +
      'hoR8L8MpNBqH6h7ZITwVTfRS4LsBvlEfT7Pzhm5YJKfM+CdzDM+L9WVEGwIDAQAB\n' +
      'AoGAYfKxwUtEbq8ulVrD3nnWhF+hk1k6KejdUq0dLYN29w8WjbCMKb9IaokmqWiQ\n' +
      '5iZGErYxh7G4BDP8AW/+M9HXM4oqm5SEkaxhbTlgks+E1s9dTpdFQvL76TvodqSy\n' +
      'l2E2BghVgLLgkdhRn9buaFzYta95JKfgyKGonNxsQA39PwECQQDKbG0Kp6KEkNgB\n' +
      'srCq3Cx2od5OfiPDG8g3RYZKx/O9dMy5CM160DwusVJpuywbpRhcWr3gkz0QgRMd\n' +
      'IRVwyxNbAkEAyh3sipmcgN7SD8xBG/MtBYPqWP1vxhSVYPfJzuPU3gS5MRJzQHBz\n' +
      'sVCLhTBY7hHSoqiqlqWYasi81JzBEwEuQQJBAKw9qGcZjyMH8JU5TDSGllr3jybx\n' +
      'FFMPj8TgJs346AB8ozqLL/ThvWPpxHttJbH8QAdNuyWdg6dIfVAa95h7Y+MCQEZg\n' +
      'jRDl1Bz7eWGO2c0Fq9OTz3IVLWpnmGwfW+HyaxizxFhV+FOj1GUVir9hylV7V0DU\n' +
      'QjIajyv/oeDWhFQ9wQECQCydhJ6NaNQOCZh+6QTrH3TC5MeBA1Yeipoe7+BhsLNr\n' +
      'cFG8s9sTxRnltcZl1dXaBSemvpNvBizn0Kzi8G3ZAgc=\n' +
      '-----END RSA PRIVATE KEY-----',
  },
})

const purchaseParams = {
  orderId: uuid(), // A unique reference
  amount: 23.45,
  cartItems: [
    {
      name: 'HP ProBook 6360b sticker',
      quantity: 2,
      price: 10.0,
    },
    {
      name: 'Delivery',
      quantity: 1,
      price: 3.45,
    },
  ],
  customer: {
    email: 'name@website.com',
    firstNames: 'John',
    familyName: 'Smith',
    phone: '+23568956958',
    country: 'DEU',
    city: 'Hamburg',
    zipCode: '20095',
    address: 'Kleine Bahnstr. 41',
  },
  note: 'Some note',
}

export default async function handler(req, res) {
  x.checkout.purchase(purchaseParams, res)
}
