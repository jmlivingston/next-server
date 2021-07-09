import { createContext, useState } from 'react'

const OptimizelyContext = createContext()

const OptimizelyProvider = ({ children }) => {
  const [data, setData] = useState({ experiments: {} })

  const initExperiment = ({ experiment, overrideVariation }) => {
    setData({
      experiments: {
        ...data.experiments,
        [experiment]: {
          variation:
            overrideVariation ||
            window.optimizely.get('state').getExperimentStates()[experiment]
              .variation,
        },
      },
    })
  }

  const getExperiment = ({ experiment }) => {
    return data.experiments?.[experiment]
  }

  return (
    <OptimizelyContext.Provider value={{ getExperiment, initExperiment }}>
      {children}
    </OptimizelyContext.Provider>
  )
}

export { OptimizelyContext, OptimizelyProvider }
