import { useInterpret } from '@xstate/react'
import React, { createContext } from 'react'
import { authMachine } from './authMachine'

export const GlobalStateContext = createContext({})

export const GlobalStateProvider = (props) => {
  const authService = useInterpret(authMachine)

  return (
    <GlobalStateContext.Provider value={{ authService }}>
      {props.children}
    </GlobalStateContext.Provider>
  )
}
