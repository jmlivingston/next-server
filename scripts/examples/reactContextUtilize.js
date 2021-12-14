import { useActor, useSelector } from '@xstate/react'
import { useContext } from 'react'
import { GlobalStateContext } from './globalState'

export const SomeComponent1 = (props) => {
  const globalServices = useContext(GlobalStateContext)
  const [state] = useActor(globalServices.authService)
  return state.matches('loggedIn') ? 'Logged In' : 'Logged Out'
}

// Optimized
const loggedInSelector = (state) => state.matches('loggedIn')

export const SomeComponent2 = () => {
  const globalServices = useContext(GlobalStateContext)
  const isLoggedIn = useSelector(globalServices.authService, loggedInSelector)
  return isLoggedIn ? 'Logged In' : 'Logged Out'
}

// Sending events that consumes service
export const SomeComponent3 = () => {
  const globalServices = useContext(GlobalStateContext)
  const isLoggedIn = useSelector(globalServices.authService, loggedInSelector)
  const { send } = globalServices.authService
  return isLoggedIn ? (
    <button type="button" onClick={() => send('LOG_OUT')}>
      Logout
    </button>
  ) : null
}

// Sending events to global store
export const SomeComponent4 = (props) => {
  const globalServices = useContext(GlobalStateContext)
  return (
    <button onClick={() => globalServices.authService.send('LOG_OUT')}>
      Log Out
    </button>
  )
}

// Sync with useEffect
export const SomeComponent5 = () => {
  const { data, error } = useSWR('/api/user', fetcher)
  const [state, send] = useMachine(machine)
  useEffect(() => {
    send({
      type: 'DATA_CHANGED',
      data,
      error,
    })
  }, [data, error, send])
}
