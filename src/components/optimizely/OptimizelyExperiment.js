import PropTypes from 'prop-types'
import React, { useContext, useEffect } from 'react'
import { OptimizelyContext } from './OptimizelyContext'

const OptimizelyExperiment = ({ children, experiment, overrideVariation }) => {
  const { initExperiment } = useContext(OptimizelyContext)
  useEffect(() => {
    initExperiment({ experiment, overrideVariation })
  }, [])

  return children
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
