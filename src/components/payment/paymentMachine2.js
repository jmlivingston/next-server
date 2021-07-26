import { assign, createMachine } from 'xstate';
import { API_ROUTES } from '../../utility/CONSTANTS';

const handleData = (data) => {
  if (data.ok) {
    return data.json();
  } else {
    // do something with bad data
    throw 'Bad error';
  }
};

const MODE = {
  SECUREV1: {
    cardNumber: '4012001037141112',
    cardHolderName: 'john smith',
  },
  SECUREV2: {
    cardNumber: '4000020951595032',
    cardHolderName: 'CL-BRW1',
  },
  SECUREV2_FRICTIONLESS: {
    cardNumber: '4000027891380961',
    cardHolderName: 'FL-BRW1',
  },
};

const paymentMachine = createMachine(
  {
    id: 'paymentMachine',
    initial: 'idle',
    context: {
      data: null,
      formState: {
        amount: '500',
        ...MODE.SECUREV2_FRICTIONLESS,
        currency: 'USD',
        CVV: '217',
        expirationMonth: '12',
        expirationYear: '25',
      },
    },
    states: {
      idle: {
        on: {
          FETCH: 'initPayment',
        },
      },
      initPayment: {
        invoke: {
          id: 'initPayment',
          src: 'initPaymentService',
          onDone: {
            target: '#paymentMachine.resolved',
            actions: ['initPaymentResolved'],
          },
          onError: {
            target: '#paymentMachine.rejected',
            actions: ['handleRejected'],
          },
        },
        on: {
          CANCEL: 'idle',
        },
      },
      // secureFingerprinting: {
      //   invoke: {
      //     id: 'secureFingerprinting',
      //     src: (context, event) => {
      //       return fetch(`http://localhost:9000/api/fsm/${context.data.next}`).then((data) => data.json());
      //     },
      //     onDone: {
      //       target: 'challengePayment',
      //       actions: assign({
      //         data: (_, event) => event.data,
      //       }),
      //     },
      //     onError: 'rejected',
      //   },
      //   on: {
      //     CANCEL: 'idle',
      //   },
      // },
      // challengePayment: {
      //   invoke: {
      //     id: 'challengePayment',
      //     src: (context, event) => {
      //       return fetch(`http://localhost:9000/api/fsm/${context.data.next}`).then((data) => data.json());
      //     },
      //     onDone: {
      //       target: 'resolved',
      //       actions: assign({
      //         data: (_, event) => event.data,
      //       }),
      //     },
      //     onError: 'rejected',
      //   },
      //   on: {
      //     CANCEL: 'idle',
      //   },
      // },
      resolved: { type: 'final' },
      rejected: {
        on: {
          FETCH: 'initPayment', // TODO
        },
      },
    },
  },
  {
    actions: {
      handleRejected: assign({
        error: (_context, event) => event,
      }),
      initPaymentResolved: assign({
        initPaymentResponse: (_context, event) => event.data,
      }),
    },
    guards: {},
    services: {
      initPaymentService: (context) => {
        return fetch(API_ROUTES.PAYMENT_INIT, {
          method: 'POST',
          body: JSON.stringify(context.formState),
        }).then(handleData);
      },
    },
  }
);

export default paymentMachine;
