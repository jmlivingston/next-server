import PropTypes from 'prop-types'
import { useContext } from 'react'
import { OptimizelyContext } from './OptimizelyContext'

const OptimizelyExperiment = ({ children, experiment }) => {
  const { getExperiment } = useContext(OptimizelyContext)
  const currentExperiment = getExperiment({ experiment })
  return children(currentExperiment?.variation?.name || null)
}

OptimizelyExperiment.propTypes = {
  children: PropTypes.func,
  experiment: PropTypes.string,
}

export default OptimizelyExperiment
