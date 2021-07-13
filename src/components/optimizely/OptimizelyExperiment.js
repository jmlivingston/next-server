import PropTypes from 'prop-types'
import { useContext } from 'react'
import { OptimizelyContext } from './OptimizelyContext'

const OptimizelyExperiment = ({ children, experiment }) => {
  const { getExperiment } = useContext(OptimizelyContext)
  const activeExperiment = getExperiment({ experiment })
  return children(activeExperiment?.variation.name || null)
}

OptimizelyExperiment.propTypes = {
  children: PropTypes.func,
  experiment: PropTypes.string,
}

export default OptimizelyExperiment
