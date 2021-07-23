import { assign, createMachine } from 'xstate';

const paymentMachine = createMachine({
  id: 'paymentMachine',
  initial: 'idle',
  context: {
    data: null,
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
        src: (context, event) => fetch('http://localhost:9000/api/fsm/4').then((data) => data.json()),
        onDone: {
          target: 'secureFingerprinting',
          actions: assign({
            data: (_, event) => event.data,
          }),
        },
        onError: 'rejected',
      },
      on: {
        CANCEL: 'idle',
      },
    },
    secureFingerprinting: {
      invoke: {
        id: 'secureFingerprinting',
        src: (context, event) => {
          return fetch(`http://localhost:9000/api/fsm/${context.data.next}`).then((data) => data.json());
        },
        onDone: {
          target: 'securePayment',
          actions: assign({
            data: (_, event) => event.data,
          }),
        },
        onError: 'rejected',
      },
      on: {
        CANCEL: 'idle',
      },
    },
    securePayment: {
      invoke: {
        id: 'securePayment',
        src: (context, event) => {
          return fetch(`http://localhost:9000/api/fsm/${context.data.next}`).then((data) => data.json());
        },
        onDone: {
          target: 'challengePayment',
          actions: assign({
            data: (_, event) => event.data,
          }),
        },
        onError: 'rejected',
      },
      on: {
        CANCEL: 'idle',
      },
    },
    challengePayment: {
      invoke: {
        id: 'challengePayment',
        src: (context, event) => {
          return fetch(`http://localhost:9000/api/fsm/${context.data.next}`).then((data) => data.json());
        },
        onDone: {
          target: 'finalPayment',
          actions: assign({
            data: (_, event) => event.data,
          }),
        },
        onError: 'rejected',
      },
      on: {
        CANCEL: 'idle',
      },
    },
    finalPayment: {
      invoke: {
        id: 'finalPayment',
        src: (context, event) => {
          return fetch(`http://localhost:9000/api/fsm/${context.data.next}`).then((data) => data.json());
        },
        onDone: {
          target: 'resolved',
          actions: assign({
            data: (_, event) => event.data,
          }),
        },
        onError: 'rejected',
      },
      on: {
        CANCEL: 'idle',
      },
    },
    resolved: { type: 'final' },
    rejected: {
      on: {
        FETCH: 'initPayment', // TODO
      },
    },
  },
});

export default paymentMachine;
