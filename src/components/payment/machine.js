// Payment Machine based on Neuvei's Server-to-server flow
// https://docs.safecharge.com/documentation/accept-payment/server-to-server-flow/
// https://docs.safecharge.com/documentation/accept-payment/flow-diagrams/#server-to-server-flow

// import { assign, Machine } from 'xstate';

const id = 'paymentMachine';

const STATES = Object.freeze({
  ERROR: 'ERROR',
  FILL_FORM: 'FILL_FORM', // Step 2
  FILL_FORM_VALIDATE: 'FILL_FORM_VALIDATE',
  INIT_PAYMENT: 'INIT_PAYMENT', // Step 1 & 3
  INIT_PAYMENT_VALIDATE: 'INIT_PAYMENT_VALIDATE',
  SECURE_FINGERPRINTING: 'SECURE_FINGERPRINTING', // Step 4
  SECURE_FINGERPRINTING_VALIDATE: 'SECURE_FINGERPRINTING_VALIDATE', // Step 4
  SECURE_PAYMENT: 'SECURE_PAYMENT', // Step 5
  SECURE_PAYMENT_VALIDATE: 'SECURE_PAYMENT_VALIDATE',
  CHALLENGE_PAYMENT: 'CHALLENGE_PAYMENT', // Step 6
  CHALLENGE_PAYMENT_VALIDATE: 'CHALLENGE_PAYMENT_VALIDATE',
  FINAL_PAYMENT: 'FINAL_PAYMENT', // Step 7
  FINAL_PAYMENT_VALIDATE: 'FINAL_PAYMENT_VALIDATE',
  PAYMENT_SUCCESSFUL: 'PAYMENT_SUCCESSFUL',
});

const IDLE_ACTIONS = Object.freeze({
  CONFIRM: 'CONFIRM',
});

const ACTIONS = Object.freeze({
  ADD_ERROR: 'ADD_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_STATE: 'UPDATE_STATE',
});

const API_STATES = Object.freeze({
  IDLE: 'IDLE',
  SUBMITTING: 'SUBMITTING',
  COMPLETE: 'COMPLETE',
});

const API_STATES_CONFIG = Object.freeze({
  IDLE: {
    exit: [ACTIONS.CLEAR_ERROR],
    on: {
      [IDLE_ACTIONS.CONFIRM]: {
        target: API_STATES.SUBMITTING,
        actions: [ACTIONS.UPDATE_STATE],
      },
    },
  },
  SUBMITTING: {
    invoke: {
      src: STATES.FILL_FORM_VALIDATE,
      onDone: {
        target: API_STATES.COMPLETE,
      },
      onError: {
        target: API_STATES.IDLE,
        actions: ACTIONS.ADD_ERROR,
      },
    },
  },
});

const GUARDS = Object.freeze({
  INIT_PAYMENT_VALIDATE: 'INIT_PAYMENT_VALIDATE',
});

const XSTATE_TYPES = Object.freeze({
  FINAL: 'final',
});

const paymentMachine = Machine({
  id,
  initial: STATES.INIT_PAYMENT, // should be fill_form
  states: {
    [STATES.FILL_FORM]: {
      id: STATES.FILL_FORM,
      initial: API_STATES.IDLE,
      onDone: { target: STATES.INIT_PAYMENT },
      states: {
        [API_STATES.IDLE]: API_STATES_CONFIG.IDLE,
        [API_STATES.SUBMITTING]: {
          invoke: {
            ...API_STATES_CONFIG.SUBMITTING.invoke,
            src: STATES.FILL_FORM_VALIDATE,
          },
        },
        [API_STATES.COMPLETE]: { type: XSTATE_TYPES.FINAL },
      },
    },
    [STATES.INIT_PAYMENT]: {
      id: STATES.INIT_PAYMENT,
      initial: API_STATES.SUBMITTING, // should be idle
      onDone: [
        { target: STATES.SECURE_FINGERPRINTING, cond: GUARDS.INIT_PAYMENT_REQUIRES_FINGERPRINTING },
        { target: STATES.SECURE_PAYMENT },
      ],
      states: {
        [API_STATES.IDLE]: API_STATES_CONFIG.IDLE,
        [API_STATES.SUBMITTING]: {
          invoke: {
            ...API_STATES_CONFIG.SUBMITTING.invoke,
            src: STATES.INIT_PAYMENT_VALIDATE,
          },
        },
        [API_STATES.COMPLETE]: { type: XSTATE_TYPES.FINAL },
      },
    },
    [STATES.SECURE_FINGERPRINTING]: {
      id: STATES.SECURE_FINGERPRINTING,
      initial: API_STATES.IDLE,
      onDone: { target: STATES.SECURE_PAYMENT },
      states: {
        [API_STATES.IDLE]: API_STATES_CONFIG.IDLE,
        [API_STATES.SUBMITTING]: {
          invoke: {
            ...API_STATES_CONFIG.SUBMITTING.invoke,
            src: STATES.SECURE_FINGERPRINTING_VALIDATE,
          },
        },
        [API_STATES.COMPLETE]: { type: XSTATE_TYPES.FINAL },
      },
    },
    [STATES.SECURE_PAYMENT]: {
      id: STATES.SECURE_PAYMENT,
      initial: API_STATES.IDLE,
      onDone: { target: STATES.CHALLENGE_PAYMENT },
      states: {
        [API_STATES.IDLE]: API_STATES_CONFIG.IDLE,
        [API_STATES.SUBMITTING]: {
          invoke: {
            ...API_STATES_CONFIG.SUBMITTING.invoke,
            src: STATES.SECURE_PAYMENT_VALIDATE,
          },
        },
        [API_STATES.COMPLETE]: { type: XSTATE_TYPES.FINAL },
      },
    },
    [STATES.CHALLENGE_PAYMENT]: {
      id: STATES.CHALLENGE_PAYMENT,
      initial: API_STATES.IDLE,
      onDone: { target: STATES.FINAL_PAYMENT },
      states: {
        [API_STATES.IDLE]: API_STATES_CONFIG.IDLE,
        [API_STATES.SUBMITTING]: {
          invoke: {
            ...API_STATES_CONFIG.SUBMITTING.invoke,
            src: STATES.CHALLENGE_PAYMENT_VALIDATE,
          },
        },
        [API_STATES.COMPLETE]: { type: XSTATE_TYPES.FINAL },
      },
    },
    [STATES.FINAL_PAYMENT]: {
      id: STATES.FINAL_PAYMENT,
      initial: API_STATES.IDLE,
      onDone: { target: STATES.PAYMENT_SUCCESSFUL },
      states: {
        [API_STATES.IDLE]: API_STATES_CONFIG.IDLE,
        [API_STATES.SUBMITTING]: {
          invoke: {
            ...API_STATES_CONFIG.SUBMITTING.invoke,
            src: STATES.FINAL_PAYMENT_VALIDATE,
          },
        },
        [API_STATES.COMPLETE]: { type: XSTATE_TYPES.FINAL },
      },
    },
    [STATES.PAYMENT_SUCCESSFUL]: {
      type: XSTATE_TYPES.FINAL,
    },
  },
  actions: {
    [ACTIONS.ADD_ERROR]: assign((_context, event) => {
      return {
        error: event.data?.message || 'An unknown error occurred',
      };
    }),
    [ACTIONS.CLEAR_ERROR]: {
      error: undefined,
    },
    [ACTIONS.UPDATE_STATE]: assign((_context, event) => {
      return {
        [event.type]: event.info,
      };
    }),
  },
  guards: {
    [GUARDS.INIT_PAYMENT_REQUIRES_FINGERPRINTING]: (context) => {
      console.log(context);
      return context.isFingerPrintingRequired;
    },
  },
});

// export default paymentMachine;
