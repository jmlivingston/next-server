import { assign, createMachine } from 'xstate';

const fetchMachine = createMachine({
  id: 'Data API',
  initial: 'idle',
  context: {
    data: null,
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading',
      },
    },
    loading: {
      invoke: {
        id: 'fetchData',
        src: (context, event) => fetch('http://localhost:9000/api/fsm/1').then((data) => data.json()),
        onDone: {
          target: 'loading2',
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
    loading2: {
      invoke: {
        id: 'fetchData',
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
    resolved: {
      type: 'final',
    },
    rejected: {
      on: {
        FETCH: 'loading',
      },
    },
  },
});

export { fetchMachine };
