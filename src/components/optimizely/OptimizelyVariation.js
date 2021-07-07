import { useContext } from 'react'
import OptimizelyContext from './OptimizelyContext'

const OptimizelyVariation = ({ children, variation }) => {
  const { variation: contextVariation } = useContext(OptimizelyContext)
  return variation === contextVariation?.id ? children : null
}

export default OptimizelyVariation
