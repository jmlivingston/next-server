import React from 'react'
import useExperiment from './optimizely/useExperiment'

const OptimizelyTesterNested = ({}) => {
  const [variation] = useExperiment(
    process.env.NEXT_PUBLIC_OPTIMIZELY_EXPERIMENT_ID
  )
  return (
    <div>
      <hr />
      Nested
      <br />
      {JSON.stringify(variation)}
    </div>
  )
}

export default OptimizelyTesterNested
