import { useMachine } from '@xstate/react'
import { toggleMachine } from '../path/to/toggleMachine'

function Toggle() {
  const [current, send] = useMachine(toggleMachine)

  return (
    <button onClick={() => send('TOGGLE')}>
      {current.matches('inactive') ? 'Off' : 'On'}
    </button>
  )
}

export default Toggle
