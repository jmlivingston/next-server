const promiseMachineConfig = {
  id: 'my-id',
  initial: 'pending',
  states: {
    pending: {
      RESOLVE: { target: 'resolved' },
      REJECT: { target: 'rejected' },
    },
    resolved: { type: 'final' },
    rejected: { type: 'final' },
  },
}

export default promiseMachineConfig
