import { createMachine } from 'xstate';

const defaultFormState = {
  amount: '100',
  cardHolderName: 'John Doe',
  cardNumber: '4111111111111111',
  cvv: '123',
  expirationMonth: 7,
  expirationYear: 2023,
  country: 'UK',
  currency: 'GBP',
  address1: '101 Main Street',
  address2: '',
  zipCode: '98115',
  city: 'San Diego',
  state: 'CA',
};

const paymentMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' },
    },
    active: {
      on: { TOGGLE: 'inactive' },
    },
  },
});

const strings = {
  amount: 'Amount',
  cardHolderName: 'Name on Card',
  cardNumber: 'Card Number',
  cvv: 'CVV',
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

export { defaultFormState, paymentMachine, strings };
