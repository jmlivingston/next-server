import { createMachine, interpret } from 'xstate'
import promiseMachineConfig from './promiseMachineConfig'

const promiseMachine = createMachine(promiseMachineConfig)
const promiseService = interpret(promiseMachine).onTransition((state) =>
  console.log(state.value)
)
promiseService.start()
promiseService.send({ type: 'RESOLVE' })

export default promiseMachine
