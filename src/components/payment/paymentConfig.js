const defaultFormState = {
  amount: '500',
  cardHolderName: 'FL-BRW1',
  cardNumber: '4111111111111111',
  CVV: '217',
  expirationMonth: '12',
  expirationYear: '25',
  country: 'GB',
  currency: 'GBP',
  address1: '101 Main Street',
  address2: '',
  zipCode: '98115',
  city: 'San Diego',
  state: 'CA',
};

const strings = {
  amount: 'Amount',
  cardHolderName: 'Name on Card',
  cardNumber: 'Card Number',
  CVV: 'CVV',
  currency: 'USD',
  expirationMonth: 'Month',
  expirationYear: 'Year',
  country: 'Country',
  address1: 'Address 1',
  address2: 'Address 2 (optional)',
  zipCode: 'Zip Code',
  city: 'City',
  state: 'State',
  submit: 'Submit',
};

const CARD_TYPE = Object.freeze({ AMEX: 'AMEX', MASTERCARD: 'MASTERCARD', VISA: 'VISA' });

const CARD_RESULT = Object.freeze({ APPROVED: 'APPROVED', DECLINED: 'DECLINED', DO_NOT_HONOR: 'DO_NOT_HONOR' });

const CARD_COUNTRY = Object.freeze({
  CR: 'CR', // Costa Rica
  DE: 'DE', // Germany
  GB: 'GB', // United Kingdom
  GR: 'GR', // Greece
  ID: 'ID', // Indonesia
  IE: 'IE', // Ireland
  KR: 'KR', // South Korea
  PR: 'PR', // Puerto Rico
  RU: 'RU', // Russia Federation
  US: 'US', // United States
});

const CARD_TRANSACTION_TYPE = Object.freeze({
  NOT_THREE_D: 'NOT_THREE_D',
  THREE_D_V1: 'THREE_D_V1',
  THREE_D_V2: 'THREE_D_V2',
});

// https://docs.safecharge.com/documentation/guides/testing/testing-cards/
const TEST_CARD_HOLDERS = Object.freeze({
  'FL-BRW1': {
    value: 'FL-BRW1',
    notes: 'Frictionless / Browser Flow',
  },
  'FL-BRW2': {
    value: 'FL-BRW2',
    notes: 'Frictionless / Browser Flow',
  },
  'FL-BRW3': {
    value: 'FL-BRW3',
    notes: 'Frictionless / Browser Flow',
  },
  'FL-BRWA': {
    value: 'FL-BRWA',
    notes: 'Frictionless / Browser Flow',
  },
  'CL-BRW1': {
    value: 'CL-BRW1',
    notes: 'Challenge / Browser Flow',
  },
  'CL-BRW2': {
    value: 'CL-BRW2',
    notes: 'Challenge / Browser Flow',
  },
  'CL-BRW3': {
    value: 'CL-BRW3',
    notes: 'Challenge / Browser Flow',
  },
  'CL-BRWA': {
    value: 'CL-BRWA',
    notes: 'Challenge / Browser Flow',
  },
  'ERR-BRW1': {
    value: 'ERR-BRW1',
    notes: 'ERR / Browser Flow',
  },
  'ERR-BRW2': {
    value: 'ERR-BRW2',
    notes: 'ERR / Browser Flow',
  },
  'ERR-BRW3': {
    value: 'ERR-BRW3',
    notes: 'ERR / Browser Flow',
  },
  'ERR-BRWA': {
    value: 'ERR-BRWA',
    notes: 'ERR / Browser Flow',
  },
  'FL-APP1': {
    value: 'FL-APP1',
    notes: 'Frictionless / Mobile Application',
  },
  'FL-APP2': {
    value: 'FL-APP2',
    notes: 'Frictionless / Mobile Application',
  },
  'FL-APP3': {
    value: 'FL-APP3',
    notes: 'Frictionless / Mobile Application',
  },
  'CL-APP1': {
    value: 'CL-APP1',
    notes: 'Challenge / Mobile Application',
  },
  'CL-APP2': {
    value: 'CL-APP2',
    notes: 'Challenge / Mobile Application',
  },
  'CL-APP3': {
    value: 'CL-APP3',
    notes: 'Challenge / Mobile Application',
  },
});

const TEST_CARDS = [
  // NOT_THREE_D
  {
    type: CARD_TYPE.VISA,
    value: 4000022756305864,
    expected: CARD_RESULT.APPROVED,
    country: CARD_COUNTRY.US,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000023104662535,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000027701563111,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000025906274039,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000996174334475,
    notes: '(returns partial approval result)',
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
  },
  {
    type: CARD_TYPE.VISA,
    value: 5333608104136723,
    notes: '(returns partial approval result)',
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333300989521936,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 2221004483162815,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333300523520196,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333309736307960,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333305783303555,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333306956697229,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
  },
  {
    type: CARD_TYPE.AMEX,
    value: 375510513169537,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
  },
  {
    type: CARD_TYPE.AMEX,
    value: 375510288656924,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
  },
  {
    type: CARD_TYPE.AMEX,
    value: 375510379996452,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
  },
  {
    type: CARD_TYPE.AMEX,
    value: 375510082116984,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
  },
  //
  {
    type: CARD_TYPE.VISA,
    value: 4008370896662369,
    country: CARD_COUNTRY.GB,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Decline',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4021937195658141,
    country: CARD_COUNTRY.GB,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Soft Decline - Authentication is Advised',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4217641329972469,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Soft Decline - Authentication is Advised',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000128449498204,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'External Error in Processing',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000135814550378,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Acquirer Validation',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000157454627969,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Lost/Stolen',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000164166749263,
    country: CARD_COUNTRY.IN,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Do Not Honor',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000173946194872,
    country: CARD_COUNTRY.IN,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Insufficient Funds',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4008384424370890,
    country: CARD_COUNTRY.GB,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Insufficient Funds',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000189336416410,
    country: CARD_COUNTRY.IN,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Exceeds Withdrawal Limit',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000196948974975,
    country: CARD_COUNTRY.IN,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Exceeds Withdrawal Frequency',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000203016321921,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Invalid Transaction',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000212384978055,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Format Error',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000229544877670,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Issuer or Switch Inoperative',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000234977370839,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Timeout/Retry',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000247422310226,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Expired Card',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000254588011960,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Transaction Not Permitted To Cardholder',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000269084739575,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Transaction Not Permitted on Terminal',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000273652260030,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Restricted Card',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333418445863914,
    country: CARD_COUNTRY.RU,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Decline',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5001638548736201,
    country: CARD_COUNTRY.GB,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Decline',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5118081410264525,
    country: CARD_COUNTRY.GB,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Soft Decline - Authentication is Advised',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5109486948867999,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Soft Decline - Authentication is Advised',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333423768173347,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'External Error in Processing',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5100976565928800,
    country: CARD_COUNTRY.GB,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'External Error in Processing',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333435197139699,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Acquirer Validation',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333452804487502,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Lost/Stolen',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333463046218753,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Do Not Honor',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333475572200849,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Insufficient Funds',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333482348715142,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Exceeds Withdrawal Limit',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333498929343773,
    country: CARD_COUNTRY.KR,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Exceeds Withdrawal Frequency',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333502383316074,
    country: CARD_COUNTRY.PR,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Invalid Transaction',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333518577223892,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Format Error',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333527145351713,
    country: CARD_COUNTRY.CR,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Issuer or Switch Inoperative',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333532915594096,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Timeout/Retry',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333540337444022,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Expired Card',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333554636535091,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Transaction Not Permitted To Cardholder',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333562868563707,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Transaction Not Permitted on Terminal',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333578626428553,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Restricted Card',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333583123003909,
    country: CARD_COUNTRY.US,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Invalid CVV',
  },
  //
  {
    type: CARD_TYPE.AMEX,
    value: 375521501910816,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Decline',
  },

  {
    type: CARD_TYPE.AMEX,
    value: 375522679892992,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'External Error in Processing',
  },
  {
    type: CARD_TYPE.AMEX,
    value: 375523500980436,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Acquirer Validation',
  },
  {
    type: CARD_TYPE.AMEX,
    value: 375525991062202,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Lost/Stolen',
  },
  {
    type: CARD_TYPE.AMEX,
    value: 375526064276158,
    country: CARD_COUNTRY.DE,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Do Not Honor',
  },
  {
    type: CARD_TYPE.AMEX,
    value: 375527639875136,
    country: CARD_COUNTRY.IE,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Insufficient Funds',
  },
  {
    type: CARD_TYPE.AMEX,
    value: 375528929838107,
    country: CARD_COUNTRY.IE,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Exceeds Withdrawal Limit',
  },
  {
    type: CARD_TYPE.AMEX,
    value: 375529856696120,
    country: CARD_COUNTRY.IE,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Exceeds Withdrawal Frequency',
  },
  {
    type: CARD_TYPE.AMEX,
    value: 375530796593260,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Invalid Transaction',
  },
  {
    type: CARD_TYPE.AMEX,
    value: 375531494255517,
    country: CARD_COUNTRY.ID,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Format Error',
  },
  {
    type: CARD_TYPE.AMEX,
    value: 375532604034750,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Issuer or Switch Inoperative',
  },
  {
    type: CARD_TYPE.AMEX,
    value: 375533558061005,
    country: CARD_COUNTRY.GR,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Timeout/Retry',
  },
  {
    type: CARD_TYPE.AMEX,
    value: 375534876707683,
    country: CARD_COUNTRY.GR,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Expired Card',
  },
  {
    type: CARD_TYPE.AMEX,
    value: 375535264614027,
    country: CARD_COUNTRY.GR,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Transaction Not Permitted To Cardholder',
  },
  {
    type: CARD_TYPE.AMEX,
    value: 375536629108788,
    country: CARD_COUNTRY.GR,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Transaction Not Permitted on Terminal',
  },
  {
    type: CARD_TYPE.AMEX,
    value: 375537795464104,
    country: CARD_COUNTRY.GR,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Restricted Card',
  },
  {
    type: CARD_TYPE.AMEX,
    value: 375538733297606,
    country: CARD_COUNTRY.GR,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.NOT_THREE_D,
    notes: 'Invalid CVV',
  },
  // THREE_D_V2
  {
    type: CARD_TYPE.VISA,
    value: 4000020951595032,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.THREE_D_V2,
    notes: 'CHALLENGE',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000027891380961,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.THREE_D_V2,
    notes: 'FRICTIONLESS',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333302221254276,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.THREE_D_V2,
    notes: '',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 2221008123677736,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.THREE_D_V2,
    notes: '',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000319872807223,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.THREE_D_V2,
    notes: 'Please try again or contact issuer.',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4001152882620768,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.THREE_D_V2,
    notes: 'Please try again or contact issuer. (Debit)',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333418445863914,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.THREE_D_V2,
    notes: 'Please try again or contact issuer.',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5001638548736201,
    expected: CARD_RESULT.DECLINED,
    transactionType: CARD_TRANSACTION_TYPE.THREE_D_V2,
    notes: 'Please try again or contact issuer.',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4000164166749263,
    expected: CARD_RESULT.DO_NOT_HONOR,
    transactionType: CARD_TRANSACTION_TYPE.THREE_D_V2,
    notes: 'Issuer declined your payment. Please try again or contact issuer. (Debit)',
  },
  {
    type: CARD_TYPE.VISA,
    value: 4008370896662369,
    expected: CARD_RESULT.DO_NOT_HONOR,
    transactionType: CARD_TRANSACTION_TYPE.THREE_D_V2,
    notes: 'Issuer declined your payment. Please try again or contact issuer. (Debit)',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 5333463046218753,
    expected: CARD_RESULT.DO_NOT_HONOR,
    transactionType: CARD_TRANSACTION_TYPE.THREE_D_V2,
    notes: 'Issuer declined your payment. Please try again or contact issuer. (Debit)',
  },
  {
    type: CARD_TYPE.MASTERCARD,
    value: 2521003720448414,
    expected: CARD_RESULT.DO_NOT_HONOR,
    transactionType: CARD_TRANSACTION_TYPE.THREE_D_V2,
    notes: 'Issuer declined your payment. Please try again or contact issuer.',
  },
  // THREE_D_V1
  {
    type: CARD_TYPE.VISA,
    value: 4407106439671112,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.THREE_D_V1,
  },
  {
    type: CARD_TYPE.VISA,
    value: 4974141536361112,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.THREE_D_V1,
  },
  {
    type: CARD_TYPE.VISA,
    value: 4160924665811112,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.THREE_D_V1,
  },
  {
    type: CARD_TYPE.VISA,
    value: 4025478179661112,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.THREE_D_V1,
  },
  {
    type: CARD_TYPE.VISA,
    value: 4175778616501112,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.THREE_D_V1,
  },
  {
    type: CARD_TYPE.VISA,
    value: 4742101426751112,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.THREE_D_V1,
  },
  // TODO: investigate why not in test cards documentation
  {
    type: CARD_TYPE.VISA,
    value: 4012001037141112,
    expected: CARD_RESULT.APPROVED,
    transactionType: CARD_TRANSACTION_TYPE.THREE_D_V2,
    notes: 'FALLBACK',
  },
];

// Minimal testing for challenge, frictionless, and fallback
const basicCards = [4000020951595032, 4000027891380961, 4012001037141112];

const getTestCards = ({ useBasic = false } = {}) =>
  TEST_CARDS.filter((card) => (useBasic ? basicCards.includes(card.value) : true)).reduce((acc, card, index) => {
    return {
      ...acc,
      [`${card.value}_${index}`]: { ...card, id: `${card.value}_${index}`, value: card.value.toString() },
    };
  }, {});

const getTestCardHolders = ({ useBasic = false } = {}) => ({
  ...Object.keys(TEST_CARD_HOLDERS)
    .filter((key) => (useBasic ? key.includes('1') && key.includes('BR') : true))
    .reduce((acc, key) => {
      return {
        ...acc,
        [key]: TEST_CARD_HOLDERS[key],
      };
    }, {}),
  'John Smith': {
    value: 'John Smith',
    notes: 'Fallback',
  },
});

export {
  CARD_COUNTRY,
  CARD_RESULT,
  CARD_TRANSACTION_TYPE,
  CARD_TYPE,
  defaultFormState,
  getTestCardHolders,
  getTestCards,
  strings,
};
