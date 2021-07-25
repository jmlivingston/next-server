const initPayment = {
  merchantSiteId: '{{merchantSiteId}}',
  merchantId: '{{merchantId}}',
  sessionToken: '{{sessionToken}}',
  clientRequestId: '{{clientRequestId}}',
  currency: 'USD',
  amount: '500',
  userTokenId: 'asdasd',
  paymentOption: {
    card: {
      cardNumber: '4000020951595032',
      cardHolderName: 'CL-BRW1',
      expirationMonth: '12',
      expirationYear: '25',
      CVV: '217',
      threeD: {
        methodNotificationUrl: 'www.ThisIsAMethodNotificationURL.com',
        platformType: '01',
      },
    },
  },
};
