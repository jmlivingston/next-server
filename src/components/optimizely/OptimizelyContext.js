import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'

const OptimizelyContext = createContext()

const OptimizelyProvider = ({ children, overrideExperiments }) => {
  const [data, setData] = useState({ experiments: {} })

  useEffect(() => {
    const experiments =
      overrideExperiments ||
      window?.optimizely?.get('state')?.getExperimentStates()
    setData({ experiments })
  }, [overrideExperiments])

  const getExperiment = ({ experiment }) => {
    return data.experiments?.[experiment]
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
  overrideExperiments: PropTypes.shape({}),
}

export { OptimizelyContext, OptimizelyProvider }
