import { assign, createMachine } from 'xstate';

const BASE_URL = 'http://localhost:9000/api/fsm/';

/*
  First 2 will run after sending FETCH
  Last will run after sending FETCH again
*/

const handleData = (data) => {
  console.log(data);
  if (data.ok) {
    return data.json();
  } else {
    // do something with bad data
    throw 'Bad error';
  }
};

const TEST_IDS = {
  DEFAULT: 1, // Will follow to FSM5
  ERROR: 100, // Will cause error
  FSM5: 200,
};

const fsmMachine = createMachine(
  {
    id: 'fsmMachine',
    initial: 'idle',
    context: {
      data: {
        id: TEST_IDS.DEFAULT,
      },
    },
    states: {
      idle: {
        on: {
          FETCH: 'fsm1',
        },
      },
      // fsm1 and fsm2 will run sequentially
      fsm1: {
        id: 'fsm1',
        invoke: {
          id: 'fetchFsm1',
          src: 'fsmService1',
          onDone: {
            target: '#fsmMachine.fsm2',
            actions: ['handleResolved'],
          },
          onError: {
            target: '#fsmMachine.rejected',
            actions: ['handleRejected'],
          },
        },
      },
      fsm2: {
        id: 'fsm2',
        invoke: {
          id: 'fetchFsm2',
          src: 'fsmService2',
          onDone: {
            target: '#fsmMachine.fsm3',
            actions: ['handleResolved'],
          },
          onError: {
            target: '#fsmMachine.rejected',
            actions: ['handleRejected'],
          },
        },
      },
      // fsm3 will run after sending FETCH, but then got to fsm4 or fsm5 based on conditions
      fsm3: {
        id: 'fsm3',
        initial: 'idle', // set "pending" to run immediately or send('FETCH')
        states: {
          idle: {
            on: {
              FETCH: 'pending',
            },
          },
          pending: {
            id: 'fetchFsm3',
            invoke: {
              src: 'fsmService3',
              onDone: [
                {
                  target: '#fsmMachine.fsm4',
                  actions: ['handleResolved'],
                  cond: 'fsmGuard3',
                },
                {
                  target: '#fsmMachine.fsm5',
                  actions: ['handleResolved'],
                },
              ],
              onError: {
                target: '#fsmMachine.rejected',
                actions: ['handleRejected'],
              },
            },
          },
        },
      },
      // fsm4 and fsm5 are based on fsm3 data
      fsm4: {
        id: 'fetchFsm4',
        invoke: {
          src: 'fsmService4',
          onDone: {
            target: '#fsmMachine.resolved',
            actions: ['handleResolved'],
          },
          onError: {
            target: '#fsmMachine.rejected',
            actions: ['handleRejected'],
          },
        },
      },
      fsm5: {
        id: 'fetchFsm5',
        invoke: {
          src: 'fsmService5',
          onDone: {
            target: '#fsmMachine.resolved',
            actions: ['handleResolved'],
          },
          onError: {
            target: '#fsmMachine.rejected',
            actions: ['handleRejected'],
          },
        },
      },
      resolved: {
        type: 'final',
      },
      rejected: {
        on: {
          RESTART: 'idle',
        },
      },
    },
  },
  {
    actions: {
      handleRejected: assign({
        error: (_context, event) => event,
      }),
      handleResolved: assign({
        data: (_context, event) => event.data,
        caller: (_context, event) => event.type,
      }),
    },
    guards: {
      fsmGuard3: (event) => event.data.id < 200,
    },
    services: {
      fsmService1: (context) => fetch(`${BASE_URL}${context.data.id}`).then(handleData),
      fsmService2: (context) => fetch(`${BASE_URL}${context.data.next}`).then(handleData),
      fsmService3: (context) => fetch(`${BASE_URL}${context.data.next}`).then(handleData),
      fsmService4: (context) => fetch(`${BASE_URL}${context.data.next}`).then(handleData),
      fsmService5: (context) => fetch(`${BASE_URL}${context.data.next}`).then(handleData),
    },
  }
);

export { fsmMachine };
