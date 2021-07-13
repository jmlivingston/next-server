import { useContext } from 'react'
import { OptimizelyContext } from './OptimizelyContext'

const useExperiment = (experiment) => {
  const { getExperiment } = useContext(OptimizelyContext)
  return [getExperiment({ experiment })?.variation.name]
}

export default useExperiment
