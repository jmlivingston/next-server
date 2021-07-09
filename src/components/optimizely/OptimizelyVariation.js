import { useContext } from 'react'
import { OptimizelyContext } from './OptimizelyContext'

const OptimizelyVariation = ({ children, experiment, variation }) => {
  const { getExperiment } = useContext(OptimizelyContext)
  const contextVariation = getExperiment({ experiment })?.variation
  return variation === contextVariation?.id ? children : null
}

export default OptimizelyVariation
