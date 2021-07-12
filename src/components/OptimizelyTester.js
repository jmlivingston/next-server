import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { getVariables } from '../utility/optimizelyUtility'
import {
  OptimizelyExperiment,
  OptimizelyProvider,
  OptimizelyVariation,
  useExperiment,
} from './optimizely'

const Optimizely = () => {
  const [isMock, setIsMock] = useState(false)
  const [
    { EXPERIMENT_ID, MOCKS, VARIATION1, VARIATION2, VARIATION3 },
    setVariables,
  ] = useState({})

  useEffect(() => {
    const variables = getVariables({
      experiment: isMock ? 101 : process.env.NEXT_PUBLIC_OPTIMIZELY_EXPERIMENT,
      isMock,
      variation: isMock ? 201 : undefined,
    })
    setVariables(variables)
  }, [isMock])

  const Nested = () => {
    const [variation] = useExperiment(EXPERIMENT_ID)
    return <div>useExperiment: {variation}</div>
  }

  return (
    <>
      <Head>
        <title>Optimizely</title>
        <script
          src={`https://cdn.optimizely.com/js/${process.env.NEXT_PUBLIC_OPTIMIZELY_SNIPPET_ID}.js`}></script>
      </Head>
      <OptimizelyProvider overrideExperiments={isMock ? MOCKS : undefined}>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="setMock"
            checked={isMock}
            onChange={() => setIsMock(!isMock)}
          />
          <label className="form-check-label" htmlFor="setMock">
            Use mock data?
          </label>
        </div>
        <hr />
        <OptimizelyExperiment experiment={EXPERIMENT_ID}>
          {(variation) => <div>OptimizelyExperiment: {variation}</div>}
        </OptimizelyExperiment>
        <OptimizelyVariation experiment={EXPERIMENT_ID} variation={VARIATION1}>
          <div>OptimizelyVariation: {VARIATION1}</div>
        </OptimizelyVariation>
        <OptimizelyVariation experiment={EXPERIMENT_ID} variation={VARIATION2}>
          <div>OptimizelyVariation: {VARIATION2}</div>
        </OptimizelyVariation>
        <OptimizelyVariation experiment={EXPERIMENT_ID} variation={VARIATION3}>
          <div>OptimizelyVariation: {VARIATION3}</div>
        </OptimizelyVariation>
        <Nested />
        <hr />
        <pre>
          <code>
            {JSON.stringify(
              { EXPERIMENT_ID, MOCKS, VARIATION1, VARIATION2, VARIATION3 },
              null,
              2
            )}
          </code>
        </pre>
        {!isMock && (
          <>
            <hr />
            Note: Append query string to URL to override variation. For example:
            ?optimizely_x=my-id.
          </>
        )}
      </OptimizelyProvider>
    </>
  )
}

export default Optimizely
