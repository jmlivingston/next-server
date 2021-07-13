import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'

const OptimizelyContext = createContext()

const OptimizelyProvider = ({ children, mocks }) => {
  const [data, setData] = useState({ experiments: {} })

  useEffect(() => {
    const experiments =
      mocks || window?.optimizely?.get('state')?.getExperimentStates()
    setData({ experiments })
  }, [mocks])

  const getExperiment = ({ experiment }) => {
    return data.experiments?.[experiment?.toString()]
  }

  return (
    <OptimizelyContext.Provider
      value={{ getExperiment, experiments: data.experiments }}>
      {children}
    </OptimizelyContext.Provider>
  )
}

OptimizelyProvider.propTypes = {
  children: PropTypes.node,
  mocks: PropTypes.shape({}),
}

export { OptimizelyContext, OptimizelyProvider }
