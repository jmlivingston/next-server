import { createMachine } from 'xstate'

const lightMachine = createMachine(
  {
    id: 'light',
    initial: 'green',
    states: {
      green: {
        entry: 'alertGreen',
      },
    },
  },
  {
    actions: {
      alertGreen: (context, event) => {
        alert('Green!')
      },
    },
    activities: {},
    delays: {},
    guards: {},
    services: {},
  }
)

console.log(lightMachine.actions) // array of actions to be executed
console.log(lightMachine.activities) // mapping of activities (true or false)
console.log(lightMachine.context) // current context
console.log(lightMachine.done) // whether state is final
console.log(lightMachine.event) // event object that triggered transition
console.log(lightMachine.history) // previous state
console.log(lightMachine.initialState) // initial state
console.log(lightMachine.meta) // static meta data
console.log(lightMachine.value) // current state { red: 'walk' }

console.log(state.matches('red'))
console.log(lightMachine.transition('yellow', { type: 'TIMER' }))

const isMatch = [{ customer: 'deposit' }, { customer: 'withdrawal' }].some(
  lightMachine.matches
)

console.log(isMatch)

export default lightMachine
