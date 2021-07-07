import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import OptimizelyContext from './OptimizelyContext'

const OptimizelyExperiment = ({ children, experiment, overrideVariation }) => {
  const [variation, setVariation] = useState()
  useEffect(() => {
    const variation =
      overrideVariation ||
      window.optimizely.get('state').getExperimentStates()[experiment].variation
    setVariation(variation)
  }, [])
  return (
    <OptimizelyContext.Provider
      value={{ experiment: { [experiment]: { variation } }, variation }}>
      {children}
    </OptimizelyContext.Provider>
  )
}

OptimizelyExperiment.propTypes = {
  children: PropTypes.node,
  experiment: PropTypes.string,
  // Used for tests or debugging Uses variant object in Constants. For example: OPTIMIZELY_EXPERIMENTS.myExperimentName.variations.myVariation
  overrideVariation: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
}

export default OptimizelyExperiment
