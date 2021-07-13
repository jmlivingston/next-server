// OptimizelyProvider ancestor is required (see OptimizelyContext.js)
import { useContext } from 'react'
import { OptimizelyContext } from './OptimizelyContext'

const useExperiment = (experiment) => {
  const { getExperiment } = useContext(OptimizelyContext)
  let experimentName
  try {
    experimentName = getExperiment({ experiment })?.variation.name
  } catch (error) {
    // TODO: Add logging
  }
  return [experimentName]
}

export default useExperiment
