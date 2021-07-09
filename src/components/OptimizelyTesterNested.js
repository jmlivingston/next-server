import React from 'react'
import { useExperiment } from './optimizely'

const OptimizelyTesterNested = ({}) => {
  const [variation] = useExperiment(
    process.env.NEXT_PUBLIC_OPTIMIZELY_EXPERIMENT_ID
  )
  return (
    <div>
      <hr />
      Nested: useExperiment
      <br />
      {variation}
    </div>
  )
}

export default OptimizelyTesterNested
