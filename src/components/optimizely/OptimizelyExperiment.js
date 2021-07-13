// OptimizelyProvider ancestor is required (see OptimizelyContext.js)
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { OptimizelyContext } from './OptimizelyContext'

const OptimizelyExperiment = ({ children, experiment }) => {
  const { getExperiment } = useContext(OptimizelyContext)
  const activeExperiment = getExperiment({ experiment })
  return typeof children === 'function'
    ? children(activeExperiment?.variation?.name || null)
    : activeExperiment?.variation?.name || children
}

OptimizelyExperiment.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]), // render props or children
  experiment: PropTypes.string,
}

export default OptimizelyExperiment
