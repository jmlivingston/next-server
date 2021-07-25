// Payment Machine based on Neuvei's Server-to-server flow
// https://docs.safecharge.com/documentation/accept-payment/server-to-server-flow/
// https://docs.safecharge.com/documentation/accept-payment/flow-diagrams/#server-to-server-flow
/* 
  Step 2 - fillForm
  Step 1 & 3 - initPayment
  Step 4 - secureFingerprinting
  Step 6 - challengePayment
  Step 7 - finalPayment
*/

import { assign, createMachine } from 'xstate';

const paymentMachine = createMachine({
  id: 'paymentMachine',
  initial: 'fillForm', // should be fill_form
  context: {
    data: null,
  },
  states: {
    fillForm: {
      id: 'fillForm',
      initial: 'idle',
      onDone: { target: 'initPayment' },
      states: {
        idle: {
          exit: 'clearError',
          on: {
            CONFIRM: {
              target: 'submitting',
              actions: 'updateState',
            },
          },
        },
        submitting: {
          invoke: {
            src: 'fillFormValidate',
            onDone: {
              target: 'complete',
            },
            onError: {
              target: 'idle',
              actions: 'addError',
            },
          },
        },
        complete: { type: 'final' },
      },
    },
    initPayment: {
      id: 'initPayment',
      initial: 'submitting', // should be idle
      onDone: [
        { target: 'secureFingerprinting', cond: 'initPaymentRequiresFingerprinting' },
        { target: 'securePayment' },
      ],
      states: {
        idle: {
          exit: 'clearError',
          on: {
            CONFIRM: {
              target: 'submitting',
              actions: 'updateState',
            },
          },
        },
        submitting: {
          invoke: {
            src: 'initPaymentValidate',
            onDone: {
              target: 'complete',
            },
            onError: {
              target: 'idle',
              actions: 'addError',
            },
          },
        },
        complete: 'final',
      },
    },
    secureFingerprinting: {
      id: 'secureFingerprinting',
      initial: 'idle',
      onDone: { target: 'securePayment' },
      states: {
        idle: {
          exit: 'clearError',
          on: {
            CONFIRM: {
              target: 'submitting',
              actions: 'updateState',
            },
          },
        },
        submitting: {
          invoke: {
            src: 'secureFingerprintingValidate',
            onDone: {
              target: 'complete',
            },
            onError: {
              target: 'idle',
              actions: 'addError',
            },
          },
        },
        complete: 'final',
      },
    },
    securePayment: {
      id: 'securePayment',
      initial: 'idle',
      onDone: { target: 'challengePayment' },
      states: {
        idle: {
          exit: 'clearError',
          on: {
            CONFIRM: {
              target: 'submitting',
              actions: 'updateState',
            },
          },
        },
        submitting: {
          invoke: {
            src: 'securePaymentValidate',
            onDone: {
              target: 'complete',
            },
            onError: {
              target: 'idle',
              actions: 'addError',
            },
          },
        },
        complete: 'final',
      },
    },
    challengePayment: {
      id: 'challengePayment',
      initial: 'idle',
      onDone: { target: 'finalPayment' },
      states: {
        idle: {
          exit: 'clearError',
          on: {
            CONFIRM: {
              target: 'submitting',
              actions: 'updateState',
            },
          },
        },
        submitting: {
          invoke: {
            src: 'challengePaymentValidate',
            onDone: {
              target: 'complete',
            },
            onError: {
              target: 'idle',
              actions: 'addError',
            },
          },
        },
        complete: 'final',
      },
    },
    finalPayment: {
      id: 'finalPayment',
      initial: 'idle',
      onDone: { target: 'paymentSuccess' },
      states: {
        idle: {
          exit: 'clearError',
          on: {
            CONFIRM: {
              target: 'submitting',
              actions: 'updateState',
            },
          },
        },
        submitting: {
          invoke: {
            src: 'finalPaymentValidate',
            onDone: {
              target: 'complete',
            },
            onError: {
              target: 'idle',
              actions: 'addError',
            },
          },
        },
        complete: 'final',
      },
    },
    paymentSuccess: { type: 'final' },
  },
  actions: {
    addError: assign((_context, event) => {
      return {
        error: event.data?.message || 'An unknown error occurred',
      };
    }),
    clearError: {
      error: undefined,
    },
    updateState: assign((_context, event) => {
      return {
        [event.type]: event.info,
      };
    }),
  },
  guards: {
    initPaymentRequiresFingerprinting: (context) => {
      return context.isFingerPrintingRequired;
    },
  },
});

export default paymentMachine;
