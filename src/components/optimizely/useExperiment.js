import { useContext } from 'react'
import OptimizelyContext from './OptimizelyContext'

const useExperiment = (experiment) => {
  const { experiment: optimizelyExperiment } = useContext(OptimizelyContext)
  return [optimizelyExperiment?.[experiment]?.variation?.name]
}

export default useExperiment
